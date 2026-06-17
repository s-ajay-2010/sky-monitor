import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
import cache_db

load_dotenv()
lat = float(os.getenv("CENTER_LAT"))
lon = float(os.getenv("CENTER_LON"))
radius = float(os.getenv("RADIUS_KM"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def adsbdb(icao24, callsign):
    cached = cache_db.get_aircraft(icao24)
    if cached and cached["origin"] and cached["origin"] != "Unknown":
        return cached["origin"], cached["destination"]
    try:
        r = requests.get(f"https://api.adsbdb.com/v0/callsign/{callsign}", timeout=5)
        if r.status_code == 200:
            route = r.json().get("response", {}).get("flightroute", {})
            return(
                route.get("origin", {}).get("iata_code", "Unknown"),
                route.get("destination", {}).get("iata_code", "Unknown")
            )
    except:
        pass
    return "Unknown", "Unknown"
    

@app.get("/")
def root():
    return {
        "status": "radar online"
    }


@app.get("/aircraft")
def get_aircraft():

    url=f"https://api.airplanes.live/v2/point/{lat}/{lon}/{radius}"
    response = requests.get(url, timeout=10)
    if response.status_code != 200:
        return{
            "error": "API unavailable"
        }
    
    try:
        data = response.json()

    except Exception:
        return{
            "error": "Invalid response"
        }

    aircraft_list = []
    ac = data.get("ac", [])

    for aircraft in ac:
        
        callsign = aircraft.get("flight", "").strip()
        
        if not callsign:
            continue
        
        icao24 = aircraft.get("hex", "").strip().strip("'")
        origin, destination = adsbdb(icao24, callsign)
        
        aircraft_data = {
            "id": icao24,
            "squawk": aircraft.get("squawk"),
            "callsign": callsign,
            "longitude": aircraft.get("lon"),
            "latitude": aircraft.get("lat"),
            "altitude": aircraft.get("alt_baro"),
            "gnd_speed": aircraft.get("gs"),
            "heading": aircraft.get("track"),
            "registration": aircraft.get("registration"),
            "type": aircraft.get("t"),
            "origin": origin,
            "destination": destination,
        }

        cache_db.update_aircraft(aircraft_data)

        aircraft_list.append(aircraft_data)
        
    cache_db.cleanup()
    return aircraft_list