import { useEffect, useState } from "react";

export default function App() {

  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prev) => (prev + 2) % 360);
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#001a00",

        backgroundImage: `
          linear-gradient(rgba(0, 255, 0, 0.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 0, 0.15) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",

        position: "relative",
        overflow: "hidden",
      }}
    >

      <div
        style={{
          position: "absolute",

          width: "700px",
          height: "700px",

          background: "conic-gradient(rgba(0, 255, 0, 0.4), transparent 70deg)",
          borderRadius: "50%",

          left: "50%",
          top: "50%",

          transform: `translate(-50%, -50%) rotate(${angle}deg)`,

          filter: "blur(8px)",
        }}
      />

    </div>
  );
}