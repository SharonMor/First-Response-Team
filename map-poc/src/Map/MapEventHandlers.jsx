import { useMapEvents } from "react-leaflet";

const MapEventHandlers = ({ updateTempSector, addSector }) => {
  useMapEvents({
    click: (e) => {
      updateTempSector([e.latlng.lat, e.latlng.lng]);
    },
    mousemove: (e) => {
      updateTempSector([e.latlng.lat, e.latlng.lng]);
    },
    dblclick: (e) => {
      // Prevent map zoom on double click if necessary
      e.originalEvent.preventDefault();
      addSector([
        [e.latlng.lat, e.latlng.lng],
        [e.latlng.lat, e.latlng.lng],
      ]);
    },
  });

  return null;
};

export default MapEventHandlers;
