// import React from "react";
// import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
// import L from "leaflet";
// import markerIconPng from "leaflet/dist/images/marker-icon.png";
// import markerIconShadow from "leaflet/dist/images/marker-shadow.png";
// import "leaflet/dist/leaflet.css"; // Ensure Leaflet CSS is imported

// const icon = new L.Icon({
//   iconUrl: markerIconPng,
//   iconRetinaUrl: markerIconPng,
//   shadowUrl: markerIconShadow,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41],
// });

// const Map = () => {
//   // Position to center the map on Israel
//   const position = [31.0461, 34.8516]; // Latitude, Longitude for Israel

//   // Additional marker position for Tel Aviv
//   const megiddoPosition = [32.581, 35.18];

//   // Base coordinates for the bottom left corner
//   const baseLat = 32.574;
//   const baseLng = 35.176;

//   // Offsets for the other corners from the base
//   const latOffset = 0.009; // Latitude offset for top corners
//   const lngOffset = 0.009; // Longitude offset for right corners

//   // Generate the corners using the base and offsets
//   const bottomLeft = [baseLat, baseLng]; // Base corner remains the same
//   const bottomRight = [baseLat, baseLng + lngOffset]; // Add longitude offset for the bottom right corner
//   const topRight = [baseLat + latOffset, baseLng + lngOffset]; // Add both latitude and longitude offsets for the top right corner
//   const topLeft = [baseLat + latOffset, baseLng]; // Add latitude offset for the top left corner

//   // Define the sector coordinates using the generated corners
//   const sectorCoordinates = [
//     bottomLeft, // Bottom left corner
//     bottomRight, // Bottom right corner
//     topRight, // Top right corner
//     topLeft, // Top left corner
//   ];
//   return (
//     <MapContainer
//       center={megiddoPosition}
//       zoom={13}
//       style={{ height: "700px", width: "100%" }}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       {/* Marker for Israel center */}
//       <Marker position={position} icon={icon}>
//         <Popup>
//           Israel. <br /> Easily customizable.
//         </Popup>
//       </Marker>
//       {/* Additional Marker for Tel Aviv */}
//       <Marker position={megiddoPosition} icon={icon}>
//         <Popup>
//           Tel Aviv. <br /> A vibrant city in Israel.
//         </Popup>
//       </Marker>
//       {/* Polygon for a sector in Tel Aviv */}
//       <Polygon positions={sectorCoordinates} color="red">
//         <Popup>A sector in Tel Aviv.</Popup>
//       </Polygon>
//     </MapContainer>
//   );
// };

// export default Map;
// import React, { useState } from "react";
// import { MapContainer, TileLayer, Polygon, useMapEvent } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// function SectorCreator({ onSectorDefined, isAddingSector }) {
//   useMapEvent("click", (e) => {
//     if (isAddingSector) {
//       onSectorDefined(e.latlng);
//     }
//   });

//   return null;
// }

// const Map = () => {
//   const [sectors, setSectors] = useState([]);
//   const [isAddingSector, setIsAddingSector] = useState(false);
//   const [currentSector, setCurrentSector] = useState([]);

//   const handleAddSectorClick = () => {
//     setIsAddingSector(true); // Enable sector adding mode
//     setCurrentSector([]); // Clear current sector preview
//   };

//   const handleSectorDefined = (latlng) => {
//     if (currentSector.length < 2) {
//       setCurrentSector([...currentSector, latlng]);
//     }
//     if (currentSector.length === 1) {
//       // When second point is added
//       const [firstPoint] = currentSector;
//       const sector = [
//         [firstPoint.lat, firstPoint.lng], // Bottom left
//         [firstPoint.lat, latlng.lng], // Bottom right
//         [latlng.lat, latlng.lng], // Top right
//         [latlng.lat, firstPoint.lng], // Top left
//       ];
//       setSectors([...sectors, sector]);
//       setIsAddingSector(false); // Disable sector adding mode
//       setCurrentSector([]); // Reset for next sector
//     }
//   };

//   return (
//     <>
//       <button onClick={handleAddSectorClick} disabled={isAddingSector}>
//         Add Sector
//       </button>
//       <MapContainer
//         center={[32.574, 35.176]}
//         zoom={7}
//         style={{ height: "400px", width: "100%" }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         {sectors.map((sector, idx) => (
//           <Polygon key={idx} positions={sector} color="red" />
//         ))}
//         {currentSector.length === 1 && (
//           <Polygon
//             positions={[...currentSector, ...currentSector]}
//             color="blue"
//           />
//         )}
//         <SectorCreator
//           onSectorDefined={handleSectorDefined}
//           isAddingSector={isAddingSector}
//         />
//       </MapContainer>
//     </>
//   );
// };

// export default Map;
import React, { useState } from "react";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapEventHandlers from "./MapEventHandlers"; // We'll create this component in the next step

const Map = () => {
  const [sectors, setSectors] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tempSector, setTempSector] = useState([]);

  const startDrawing = () => setIsDrawing(true);

  const addSector = (sector) => {
    if (!isDrawing || tempSector.length === 2) {
      setSectors([...sectors, sector]);
      setIsDrawing(false);
      setTempSector([]);
    }
  };

  const updateTempSector = (point) => {
    if (isDrawing) {
      if (tempSector.length === 0) {
        setTempSector([point, point]);
      } else {
        setTempSector([tempSector[0], point]);
      }
    }
  };
  const megiddoPosition = [32.581, 35.18];
  return (
    <>
      <button onClick={startDrawing} disabled={isDrawing}>
        Add Sector
      </button>
      <MapContainer
        center={megiddoPosition}
        zoom={15}
        style={{ height: "700px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {sectors.map((sector, idx) => (
          <Polygon key={idx} positions={sector} color="red" />
        ))}
        {tempSector.length === 2 && (
          <Polygon
            positions={[
              tempSector[0],
              [tempSector[0][0], tempSector[1][1]],
              tempSector[1],
              [tempSector[1][0], tempSector[0][1]],
            ]}
            color="blue"
          />
        )}
        <MapEventHandlers
          updateTempSector={updateTempSector}
          addSector={addSector}
        />
      </MapContainer>
    </>
  );
};

export default Map;
