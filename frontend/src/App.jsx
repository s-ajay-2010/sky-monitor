import { useEffect, useState } from "react";
import React from "react";

export default function App() {

  const [angle, setAngle] = useState(0);

  const [aircrafts, setAircrafts] = useState([
    {
      id: 1,
      x: 120,
      y: 80,
      callsign: "ABCD",
      altitude: "36,000ft",
      speed: "450kts",
      heading: "132°",
      lastDetectionTime: 0,
      lastSeenX: 120,
      lastSeenY: 80,
      color: "#00ff66",
    },
    {
      id: 2,
      x: -180,
      y: -120,
      callsign: "EFGH",
      altitude: "45,000ft",
      speed: "400kts",
      heading: "250°",
      lastDetectionTime: 0,
      lastSeenX: -180,
      lastSeenY: -120,
      color: "#cc0404",
    }
  ]);

  const[selectedAircraft, setSelectedAircraft] = useState(null);

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
            lastSeenX: difference < 1.2 ? aircraft.x : aircraft.lastSeenX,
            lastSeenY: difference < 1.2 ? aircraft.y : aircraft.lastSeenY,
          };
        });
      });
      return next;
    });
  }, 16);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const moveInterval = setInterval(() => {

      setAircrafts((prevAircrafts) => {
        return prevAircrafts.map((aircraft) => {
          let newX = aircraft.x + (Math.random() * 6 - 3);
          let newY = aircraft.y + (Math.random() * 6 - 3);

          newX = Math.max(-350, Math.min(350, newX));
          newY = Math.max(-350, Math.min(350, newY));
          
          return {
            ...aircraft,
            x: newX,
            y: newY,
          };
        });
      });
    }, 2000);

    return () => clearInterval(moveInterval);
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
    >

      <div
        style={{
          width: "330px",
          height: "fit-content",
          alignSelf: "flex-start",

          border: "1px solid rgba(0, 255, 0, 0.15)",
          borderRadius: "12px",

          background: "rgba(0, 20, 0, 0.45)",

          padding: "18px",

          zIndex: 10,

          boxShadow: "0 0 20px rgba(0, 255, 0, 0.08)",
          backdropFilter: "blur(4px)"
        }}
      >
        <div
          style={{
            fontSize: "28px",
            marginBottom: "20px",

            textShadow: "0 0 10px #00ff66",
          }}
        >
          SKY-MONITOR
        </div>
        
        <div
          style={{
            opacity: 0.7,
            marginBottom: "10px",
          }}
        >
          RADAR ONLINE
        </div>

        <div
          style={{
            opacity: 0.7,
            marginBottom: "10px",
          }}
        >
          SIGNAL: STRONG
        </div>

        <div
          style={{
            opacity: 0.7,
          }}
        >
          TRACKING ACTIVE
        </div>
      </div>
      
      <div
        style={{
          flex: 1,
          height: "100%",

          position: "relative",

          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >

      <div
        style={{
          position: "absolute",

          width: "850px",
          height: "850px",
          
          border: "2px solid rgba(0, 255, 0, 0.2)",
          borderRadius: "50%",

          left: "50%",
          top: "50%",

          transform: "translate(-50%, -50%)",
        }}
      >

        <div
        style={{
          position: "absolute",

          width: "2px",
          height: "850px",

          background: "rgba(0, 255, 0, 0.15)",

          left: "50%",
          top: "-2px",

          transform: "translateX(-50%)"
        }}
      />

        <div
        style={{
          position: "absolute",

          width: "850px",
          height: "2px",

          background: "rgba(0, 255, 0, 0.15)",

          top: "50%",
          left: "-2px",

          transform: "translateY(-50%)",
        }}
      />

      <div
        style={{
          position: "absolute",

          width: "850px",
          height: "2px",

          background: "rgba(0, 255, 0, 0.08)",

          top: "50%",
          left: "-2px",

          transform: "rotate(45deg)",
        }}
      />

      <div
        style={{
          position: "absolute",

          width: "850px",
          height: "2px",

          background: "rgba(0, 255, 0, 0.08)",

          top: "50%",
          left: 0,

          transform: "rotate(-45deg)",
        }}
      />

      </div>

      <div
        style={{
          position: "absolute",

          width: "600px",
          height: "600px",

          border: "2px solid rgba(0, 255, 0, 0.15)",
          borderRadius: "50%",

          left: "50%",
          top: "50%",

          transform: "translate(-50%, -50%)",
        }}
      />

      <div
        style={{
          position: "absolute",

          width: "400px",
          height: "400px",

          border: "2px solid rgba(0, 255, 0, 0.1)",
          borderRadius: "50%",

          left: "50%",
          top: "50%",

          transform: "translate(-50%, -50%)"
        }}
      />

      <div
        style={{
          position: "absolute",

          width: "14px",
          height: "14px",

          background: "#004100",
          
          borderRadius: "50%",

          left: "50%",
          top: "50%",

          transform: "translate(-50%, -50%)",

          boxShadow: "0 0 20px #015401",
        }}
      />
 
      {aircrafts.map((aircraft) => (

       <React.Fragment key={aircraft.id}>
      
       {Date.now() - aircraft.lastDetectionTime < 15000 && (
        <>
         <div
           key={aircraft.id}
 
           onClick={(e) => {
            e.stopPropagation();
            setSelectedAircraft(aircraft);
           }}
 
           style={{
             position: "absolute",
 
             width: "14px",
             height: "14px",
 
             background: selectedAircraft?.id === aircraft.id ? "#ccffcc" : `${aircraft.color}`,
 
             borderRadius: "50%",
 
             left: `calc(50% + ${aircraft.lastSeenX}px)`,
             top: `calc( 50% - ${aircraft.lastSeenY}px)`,
 
             boxShadow: selectedAircraft?.id === aircraft.id ? "0 0 30px #ccffcc" : `0 0 20px ${aircraft.color}`,
 
             cursor: "pointer",
             
             zIndex: 20,
           }}
         />
        </>
       )}
      </React.Fragment>
     ))}

      <div
        style={{
          position: "absolute",

          width: "900px",
          height: "900px",

          background: `conic-gradient( transparent 0deg, transparent 280deg, rgba(0, 255, 0, 0.01) 300deg, rgba(0, 255, 0, 0.03) 320deg, rgba(0, 255, 0, 0.08) 340deg, rgba(0, 255, 0, 0.18) 350deg, rgba(0, 255, 0, 0.35) 360deg)`,
          borderRadius: "50%",

          left: "50%",
          top: "50%",

          transform: `translate(-50%, -50%) rotate(${angle}deg)`,

          filter: "blur(8px)",
          opacity: 0.9,
        }}
      />
      </div>

      <div
        style={{
          width: "330px",
          height: "fit-content",
          alignSelf: "flex-start",

          border: "1px solid rgba(0, 255, 0, 0.15)",
          borderRadius: "12px",

          background: "rgba(0, 20, 0, 0.45)",

          padding: "18px",

          zIndex: 10,

          boxShadow: "0 0 20px rgba(0, 255, 0, 0.08)",
          backdropFilter: "blur(4px)"
        }}
      >
        <div
        style={{
          fontSize: "18px",
          opacity: 0.7,
          marginBottom: "20px",
        }}
        >
          TRACKED OBJECT
        </div>

        <div
          style={{
            fontSize: "42px",
            marginBottom: "30px",

            textShadow: "0 0 10px #00ff66",
          }}
        >
          {selectedAircraft ? selectedAircraft.callsign : "NO TARGET"}
        </div>

        <div style={{marginBottom: "14px"}}>ALTITUDE: {selectedAircraft?.altitude || "---"}</div>
        <div style={{marginBottom: "14px"}}>AIR-SPEED: {selectedAircraft?.speed || "---"}</div>
        <div style={{marginBottom: "14px"}}>HEADING: {selectedAircraft?.heading || "---"}</div>
        <div style={{marginBottom: "14px"}}>STATUS: {selectedAircraft ? "TRACKING" : "NOTHING TO TRACK"}</div>
      </div>

    </div>
  );
}