import { useEffect, useState } from "react";

export default function App() {

  const [angle, setAngle] = useState(0);
  const [showBlip, setShowBlip] = useState(false);

  const [blip, setBlip] = useState({
    x: 62,
    y: 38,
    visible: false,
  });

  useEffect(() => {
    const interval = setInterval(() => {

      setAngle((prev) => {
        const next = (prev + 2) % 360;

        const dx = blip.x - 50;
        const dy = 50 - blip.y;

        let targetAngle = Math.atan2(dy, dx) * (180 / Math.PI);

        if (targetAngle < 0) {
          targetAngle += 360;
        }
        const difference = Math.abs(next - targetAngle);

        if (difference < 4) {
          setBlip((prevBlip) => ({
            ...prevBlip,
            visible: true
          }));
        }
        else {
          setBlip((prevBlip) => ({
            ...prevBlip,
            visible: false,
          }));
        }

        return next;
      });
    }, 16);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const moveInterval = setInterval(() => {

      setBlip({
        x: Math.random() * 40+30,
        y: Math.random() * 40+30,
        visible: false,
      });
    }, 4000);

    return () => clearInterval(moveInterval);
  }, []);

  return (
    <div
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
          width: "220px",
          height: "95%",

          border: "1px solid rgba(0, 255, 0, 0.15)",
          borderRadius: "12px",

          background: "rgba(0, 20, 0, 0.45)",

          padding: "20px",

          zIndex: 10,

          boxShadow: "0 0 20px rgba(0, 255, 0, 0.08)",
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
          width: "78%",
          height: "100%",
          position: "relative",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >

      <div
        style={{
          position: "absolute",

          width: "2px",
          height: "100%",

          background: "rgba(0, 255, 0, 0.15)",

          left: "50%",
          top: 0,

          transform: "translateX(-50%)"
        }}
      />

      <div
        style={{
          position: "absolute",

          width: "100%",
          height: "2px",

          background: "rgba(0, 255, 0, 0.15)",

          top: "50%",
          left: 0,

          transform: "translateY(-50%)",
        }}
      />

      <div
        style={{
          position: "absolute",

          width: "140%",
          height: "2px",

          background: "rgba(0, 255, 0, 0.08)",

          top: "50%",
          left: "-20%",

          transform: "rotate(45deg)",
        }}
      />

      <div
        style={{
          position: "absolute",

          width: "140%",
          height: "2px",

          background: "rgba(0, 255, 0, 0.08)",

          top: "50%",
          left: "-20%",

          transform: "rotate(-45deg)",
        }}
      />

      <div
        style={{
          position: "absolute",

          width: "900px",
          height: "900px",

          border: "2px solid rgba(0, 255, 0, 0.2)",
          borderRadius: "50%",

          left: "50%",
          top: "50%",

          transform: "translate(-50%, -50%)",
        }}
      />

      <div
        style={{
          position: "absolute",

          width: "650px",
          height: "650px",

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

          background: "#ccffcc",
          
          borderRadius: "50%",

          left: "50%",
          top: "50%",

          transform: "translate(-50%, 50%)",

          boxShadow: "0 0 20px #ccffcc",
        }}
      />

      {blip.visible && (
        <div
        style={{
          position: "absolute",

          width: "12px",
          height: "12px",

          background: "#00ff66",
          
          borderRadius: "50%",

          left: `${blip.x}%`,
          top: `${blip.y}%`,

          boxShadow: "0 0 20px #00ff66",
          transform: "translate(-50%, -50%)"
        }}
      />
      )}

      <div
        style={{
          position: "absolute",

          width: "900px",
          height: "900px",

          background: "conic-gradient(rgba(0, 255, 0, 0.4), transparent 70deg)",
          borderRadius: "50%",

          left: "50%",
          top: "50%",

          transform: `translate(-50%, -50%) rotate(${angle}deg)`,

          filter: "blur(3px)",
          opacity: 0.9,
        }}
      />
      </div>

      <div
        style={{
          width: "320px",
          height: "95%",

          border: "1px solid rgba(0, 255, 0, 0.15)",
          borderRadius: "12px",

          background: "rgba(0, 20, 0, 0.45)",

          padding: "20px",

          zIndex: 10,

          boxShadow: "0 0 20px rgba(0, 255, 0, 0.08)",
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
          AAL2459
        </div>

        <div style={{marginBottom: "14px"}}>TYPE: COMMERCIAL AIRCRAFT</div>
        <div style={{marginBottom: "14px"}}>ALTITUDE: 36,000ft</div>
        <div style={{marginBottom: "14px"}}>AIR-SPEED: 456kt</div>
        <div style={{matginBottom: "14px"}}>HEADING: 132°</div>
        <div style={{marginBottom: "14px"}}>RANGE: 182NM</div>
        <div style={{marginBottom: "14px"}}>STATUS: TRACKING</div>
      </div>

    </div>
  );
}