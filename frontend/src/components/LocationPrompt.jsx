export default function LocationPrompt({onAllow, lf}) {
    return (
        <div className="location-modal">
            <div className="location-card">
                <h2>📍 Use your location?</h2>
                <p style={{color: lf ? "#ff0000" : "#00ff88" }}>{lf ? "Error: Give location access to use this" : "Sky Monitor has to detect your current location to show the aircrafts near you, so please grant location access."}</p>
                <button onClick={onAllow}>Allow Location</button>
            </div>
        </div>
    );
}