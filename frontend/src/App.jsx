import { useEffect, useState } from "react";
import React from "react";
import AircraftCard from "./components/AircraftCard.jsx"
import StatusPanel from "./components/StatusPanel.jsx"
import RadarAnimation from "./components/RadarAnimation.jsx"
import CoordInput from "./components/CoordInput.jsx"

const API = import.meta.env.VITE_API_URL
const SCALE = 0.8;

export default function App() {
  const [CENTER_LAT, setCenterLat] = useState(parseFloat(import.meta.env.VITE_CENTER_LAT));
  const [CENTER_LON, setCenterLon] = useState(parseFloat(import.meta.env.VITE_CENTER_LON));

  const [angle, setAngle] = useState(0);

  const [aircrafts, setAircrafts] = useState([]);

  const[selectedAircraft, setSelectedAircraft] = useState(null);
  const[backendOnline, setBackendOnline] = useState(false);

  useEffect(() => {
    const fetchAircraft = async () => {
      try {
        const response = await fetch(`${API}aircraft`);

        const data = await response.json();
        console.log(data)

        setAircrafts((prevAircrafts) => {
          return data.map((newAircraft) => {
            const existingAircraft = prevAircrafts.find((a) => a.id === newAircraft.id);
            
            return {
              ...newAircraft,
              x: (newAircraft.longitude - CENTER_LON) * SCALE * 111,
              y: (newAircraft.latitude - CENTER_LAT) * SCALE * 111,
              lastDetectionTime: existingAircraft?.lastDetectionTime || 0,
              };
            });
          });
        }
        catch(error){
          console.error("Aircraft fetch failed:", error);
        }
      };
      
      fetchAircraft();
      const interval = setInterval(fetchAircraft, 5000);
      
      return() => clearInterval(interval);
    }, [CENTER_LAT, CENTER_LON]);

  useEffect(() => {
    const interval = setInterval(() => {

      setAngle((prev) => {
        const next = (prev + 0.35) % 360;

        setAircrafts((prevAircrafts) => {
          return prevAircrafts.map((aircraft) => {
           const dx = aircraft.x;
           const dy = aircraft.y;

           let targetAngle = (90 - Math.atan2(dy, dx) * (180 / Math.PI) + 360) % 360;

          const difference = Math.abs(next - targetAngle) > 180 ? 360 - Math.abs(next - targetAngle) : Math.abs(next - targetAngle);

          return {
            ...aircraft,
            lastDetectionTime: difference < 1.2 ? Date.now() : aircraft.lastDetectionTime,
          };
        });
      });
      return next;
    });
  }, 16);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setSelectedAircraft(null);
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch(API);

        setBackendOnline(response.ok);
      }
      catch (error) {
        setBackendOnline(false);
      }
    };

    checkBackend();

    const interval = setInterval(checkBackend, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      onClick={() => setSelectedAircraft(null)}
      style={{
        width: "100vw",
        height: "100vh",
        background: "#001a00",

        backgroundImage: `
          linear-gradient(rgba(0, 255, 0, 0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 0, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: "28px 28px",

        position: "relative",
        overflow: "hidden",

        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        color: "#00ff66",
        fontFamily: "monospace"
      }}
    >{/* want to make a file for this, but wont:( */}
    

      <div style={{display: "flex", flexDirection: "column", alignSelf: "flex-start"}}>
        <StatusPanel backendOnline={backendOnline} aircraftCount={aircrafts.length} />
        <CoordInput onSubmit={(lat, lon) => {setCenterLat(lat); setCenterLon(lon);}} />
      </div>
      <RadarAnimation aircrafts={aircrafts} selectedAircraft={selectedAircraft} setSelectedAircraft={setSelectedAircraft} angle={angle}/>
      <AircraftCard selectedAircraft={selectedAircraft} />
    </div>
  );
}