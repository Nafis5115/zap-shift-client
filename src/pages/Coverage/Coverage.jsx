import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Coverage = () => {
  const center = [23.685, 90.3563];
  const [warehouseData, setWarehouseData] = useState([]);
  const mapRef = useRef(null);
  console.log(warehouseData);
  useEffect(() => {
    fetch("warehouses.json")
      .then((res) => res.json())
      .then((data) => setWarehouseData(data));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = warehouseData.find((w) =>
      w.district.toLowerCase().includes(location.toLowerCase()),
    );
    if (district) {
      const coord = [district.latitude, district.longitude];
      mapRef.current.flyTo(coord, 14);
    }
  };
  return (
    <div>
      <div className="mb-20 mt-10">
        <form onSubmit={handleSearch}>
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              name="location"
              type="search"
              className="grow"
              placeholder="Search"
            />
          </label>
        </form>
      </div>
      <div className="h-[800px] w-full">
        <MapContainer
          className="h-[800px]"
          center={center}
          zoom={8}
          ref={mapRef}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          ></TileLayer>
          {warehouseData.map((warehouse, index) => {
            const position = [warehouse.latitude, warehouse.longitude];
            return (
              <Marker key={index} position={position}>
                <Popup>{warehouse.covered_area.join(", ")}</Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
