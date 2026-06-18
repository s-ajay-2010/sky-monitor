export default function StatusPanel({backendOnline, aircraftCount}) {
    return(
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
            color: backendOnline ? "#00ff66" : "#ff3333",
            marginBottom: "10px",
          }}
        >
          RADAR-STATUS: {backendOnline ? "ONLINE" : "OFFLINE"}
        </div>

        <div
          style={{
            opacity: 0.7,
            marginBottom: "10px",
            color: backendOnline ? "#00ff66" : "ff3333"
          }}
        >
          SIGNAL: {backendOnline ? "STRONG" : "IDK VRO BACKEND QUIT:("}
        </div>

        <div
          style={{
            opacity: 0.7,
            marginBottom: "10px",
            color: backendOnline ? "00ff66" : "ff3333"
          }}
        >
          TRACKING: {backendOnline ? aircraftCount : "0"}
        </div>
      </div>
    )
}