import libsql # pyright: ignore[reportMissingImports]
import os
from dotenv import load_dotenv
import time
import threading

load_dotenv(override=True)

conn = libsql.connect(database=os.environ["TURSO_DATABASE_URL"], auth_token=os.environ["TURSO_AUTH_TOKEN"])

conn.row_factory = libsql.Row
db_lock = threading.Lock()
def get_cursor():
    return conn.cursor()

def init_db():
    cursor = get_cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS aircraft(
            icao24 TEXT PRIMARY KEY,
            callsign TEXT,
            latitude REAL,
            longitude REAL,
            altitude INTEGER,
            gnd_speed INTEGER,
            heading REAL,
            registration TEXT,
            type TEXT,
            origin TEXT,
            destination TEXT,
            status TEXT,
            last_seen INTEGER

        )
    """)

    conn.commit()

def update_aircraft(aircraft):
    with db_lock:
        cursor = get_cursor()
        cursor.execute("""
            INSERT OR REPLACE INTO aircraft(
                icao24,
                callsign,
                latitude,
                longitude,
                altitude,
                gnd_speed,
                heading,
                registration,
                type,
                origin,
                destination,
                status,
                last_seen
            )
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            aircraft["id"],
            aircraft["callsign"],
            aircraft["latitude"],
            aircraft["longitude"],
            aircraft["altitude"],
            aircraft["gnd_speed"],
            aircraft["heading"],
            aircraft["registration"],
            aircraft["type"],
            aircraft.get("origin"),
            aircraft.get("destination"),
            aircraft.get("status"),
            int(time.time())
            )
        )
        conn.commit()
    
    

def cleanup(max_age=300):
    with db_lock:
        cursor = get_cursor()
        cutoff = int(time.time()) - max_age
        cursor.execute("DELETE FROM aircraft WHERE last_seen < ?", (cutoff,))
        conn.commit()

 
    
def get_aircraft(icao24):
    with db_lock:
        cursor = get_cursor()
        cursor.execute("SELECT * FROM aircraft WHERE icao24 = ?", (icao24, ))
        return cursor.fetchone()

    
init_db()

