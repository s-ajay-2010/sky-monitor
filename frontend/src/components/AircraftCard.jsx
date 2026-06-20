export default function AircraftCard({selectedAircraft}) {
  const isA380 = ["A380", "A388", "A38N"].includes(selectedAircraft?.type);
    return(
        <div
        style={{
          width: "330px",
          height: "fit-content",
          alignSelf: "flex-start",

          border: "1px solid rgba(0, 255, 0, 0.15)",
          borderRadius: "12px",

          backgroundColor: isA380 ? "rgba(0, 20, 0, 0.75)" : "rgba(0, 0, 0, 0.45)",
          backgroundImage: isA380 ? "url('/src/assets/a380.jpg')" : "none",
          backgroundSize: "cover",
          backgroundBlendMode: "overlay",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",

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

        <div style={{marginBottom: "14px"}}>AIRCRAFT: {selectedAircraft?.type || "---"}</div>
        <div style={{marginBottom: "14px"}}>CALLSIGN: {selectedAircraft?.callsign || "---"}</div>
        <div style={{marginBottom: "14px"}}>ALTITUDE: {selectedAircraft?.altitude || "---"}ft</div>
        <div style={{marginBottom: "14px"}}>AIR-SPEED: {selectedAircraft?.gnd_speed || "---"}kts</div>
        <div style={{marginBottom: "14px"}}>HEADING: {selectedAircraft?.heading || "---"}°</div>
        <div style={{marginBottom: "14px"}}>SQUAWK: {selectedAircraft?.squawk || "---"}</div>
        <div style={{marginBottom: "14px"}}>FROM: {selectedAircraft?.origin || "---"}</div>
        <div style={{marginBottom: "14px"}}>DESTINATION: {selectedAircraft?.destination || "---"}</div>
        <div style={{marginBottom: "14px"}}>STATUS: {selectedAircraft ? "TRACKING" : "NOTHING TO TRACK"}</div>
      </div>
    )
}