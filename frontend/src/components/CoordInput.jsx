import{ useState } from "react";

export default function CoordInput({onSubmit}) {
    const [lat, setLat] = useState("");
    const [lon, setLon] = useState("");

    const inputStyle = {
        background: "transparent",
        border: "1px solid rgba(0, 255, 0, 0.3)",
        borderRadius: "6px",
        color: "#00ff66",
        fontFamily: "monospace",
        fontSize: "13px",
        padding: "6px 8px",
        width: "100%",
        outline: "none",
        marginBottom: "8px",
        boxSizing: "border-box",
    };

    return(
        <div style={{
            width: "330px",
            border: "1px solid rgba(0, 255, 0, 0.15)",
            borderRadius: "12px",
            background: "rgba(0, 20, 0, 0.45)",
            padding: "18px",
            marginTop: "12px",
            boxShadow: "0 0 20px rgba(0, 255, 0, 0.08)",
            backdropFilter: "blur(4px)",
            fontFamily: "monospace",
            color: "#00ff66",
        }}>
            <div style={{fontSize: "13px", opacity: 0.7, marginBottom: "12px"}}>
                SET CENTER POINT(YOUR LOCATION)
            </div>
            <input
                style={inputStyle}
                placeholder="LATITUDE (e.g. 13.0)"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
            />
             <input
                style={inputStyle}
                placeholder="LONGITUDE (e.g. 77.5)"
                value={lon}
                onChange={(e) => setLon(e.target.value)}
            />
            <button
                onClick={() => {
                    const parsedLat = parseFloat(lat);
                    const parsedLon = parseFloat(lon);
                    if (!isNaN(parsedLat) && !isNaN(parsedLon)) {
                        onSubmit(parsedLat, parsedLon);
                    }
                }}
                style={{
                    width: "100%",
                    padding: "7px",
                    background: "transparent",
                    border: "1px solid rgba(0, 255, 0, 0.4)",
                    borderRadius: "6px",
                    color: "#00ff66",
                    fontFamily: "monospace",
                    fontSize: "13px",
                    cursor: "pointer",
                    letterSpacing: "1px",
                }}
            >
                APPLY
            </button>
        </div>
    );
}