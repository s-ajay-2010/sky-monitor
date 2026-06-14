import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
import cache_db
import fr24_scraper
from geopy.distance import geodesic

load_dotenv()
CENTER_LAT = float(os.getenv("CENTER_LAT"))
CENTER_LON = float(os.getenv("CENTER_LON"))
RADIUS_KM = float(os.getenv("RADIUS_KM"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

cs_map = {
    "IGO": "6E",
    "AIC": "AI",
    "IX": "AXB",
    "QP": "AKJ",
    "SG": "SEJ",
    "9I": "LLR",
    "S5": "SDG",
    "EK": "UAE",
    "EY": "ETD",
    "QR": "QTR",
    "G9": "ABY",
    "WY": "OMA",
    "OV": "OMS",
    "J9": "JZR",
    "KU": "KAC",
    "SQ": "SIA",
    "TR": "TGW",
    "MH": "MAS",
    "AK": "AXM",
    "TG": "THA",
    "FD": "AIQ",
    "CX": "CPA",
    "UL": "ALK",
    "8D": "EXV",
    "BG": "BBC",
    "LH": "DLH",
    "BA": "BAW",
    "ET": "ETH",
    "VTI": "UK",
}

def fr24CallsignConverter(cs):
    for prefix, replacement in cs_map.items():
        if cs.startswith(prefix):
            return cs.replace(prefix, replacement, 1)
    return cs
    

@app.get("/")
def root():
    return {
        "status": "radar online"
    }


@app.get("/aircraft")
def get_aircraft():

    url="https://opensky-network.org/api/states/all"
    response = requests.get(url, timeout=10)
    if response.status_code != 200:
        return{
            "error": "OpenSky API unavailable"
        }
    
    try:
        data = response.json()

    except Exception:
        return{
            "error": "Invalid OpenSky response"
        }

    aircraft_list = []
    states = data.get("states", [])

    for aircraft in states:

        if aircraft[5] is None or aircraft[6] is None or aircraft[9] is None or aircraft[10] is None:
            continue
        
        aircraft_coords = (aircraft[6], aircraft[5])
        
        distance = geodesic((CENTER_LAT, CENTER_LON), aircraft_coords).km
        
        if distance > RADIUS_KM:
            continue
        
        callsign = aircraft[1].strip() if aircraft[1] else "UNKNOWN"
        fr24_cs = fr24CallsignConverter(callsign)
        metadata = fr24_scraper.scrape_fr24(fr24_cs)

        aircraft_data = {
            "id": aircraft[0],
            "squawk": aircraft[14],
            "callsign": callsign,
            "longitude": aircraft[5],
            "latitude": aircraft[6],
            "altitude": round(aircraft[7] * 3.28084) if aircraft[7] else None,
            "gnd_speed": round(aircraft[9] * 1.94384),
            "heading": aircraft[10],
            "fr24_url": f"https://www.flightradar24.com/data/flights/{fr24_cs.lower()}",
            "metadata": metadata,
            "registration": metadata.get("registration"),
            "type": metadata.get("aircraft"),
            "origin": metadata.get("origin"),
            "destination": metadata.get("destination"),
            "status": metadata.get("status")
        }

        cache_db.update_aircraft(aircraft_data)

        aircraft_list.append(aircraft_data)
        
    cache_db.cleanup()
    return aircraft_list