from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()
FA =os.getenv("FRONTEND_API").strip()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FA],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

aircraft = [
    {
        "id": 1,
        "x": 120,
        "y": 80,
        "callsign": "ABCD",
        "type": "A380",
        "altitude": "36,000ft",
        "speed": "450kts",
        "heading": "132°",
        "vx": 0.15,
        "vy": 0.50,
        "color": "#00ff66",
    },

    {
      "id": 2,
      "x": -180,
      "y": -120,
      "callsign": "EFGH",
      "type": "B777",
      "altitude": "45,000ft",
      "speed": "400kts",
      "heading": "250°",
      "vx": 0.8,
      "vy": 0.18,
      "color": "#cc0404",
    }
]


@app.get("/")
def root():
    return {
        "status": "radar online"
    }


@app.get("/aircraft")
def get_aircraft():

    for ac in aircraft:
        ac["x"] += ac["vx"]
        ac["y"] += ac["vy"]

        if ac["x"] < -350 or ac["x"] > 350:
            ac["vx"] *= -1

        if ac["y"] < -350 or ac["y"] > 350:
            ac["vy"] *= -1

    return aircraft