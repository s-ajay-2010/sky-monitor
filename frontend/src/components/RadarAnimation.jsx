import React from "react";

export default function RadarAnimation({aircrafts, selectedAircraft, setSelectedAircraft, angle}){
    return(
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
 
             left: `calc(50% + ${aircraft.x}px)`,
             top: `calc( 50% - ${aircraft.y}px)`,
 
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

          width: "850px",
          height: "850px",

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
    )
}