import React, { useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const FlyToLocation = ({ location }) => {
  const map = useMap();

  React.useEffect(() => {
    if (location) {
      map.flyTo([location.latitude, location.longitude], 12, {
        duration: 1.5,
      });
    }
  }, [location, map]);

  return null;
};

const Coverage = () => {
  let serviceCenter = useLoaderData();
  const [searchText, setSearchText] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Convert to array if single object comes from backend
  if (!Array.isArray(serviceCenter)) {
    serviceCenter = [serviceCenter];
  }

  const defaultCenter = [
    serviceCenter[0]?.latitude || 23.8103,
    serviceCenter[0]?.longitude || 90.4125,
  ];

  const handleSearch = () => {
    const found = serviceCenter.find(
      (item) =>
        item.district.toLowerCase() === searchText.toLowerCase() ||
        item.city.toLowerCase() === searchText.toLowerCase()
    );

    if (found) {
      setSelectedLocation(found);
    } else {
      alert("District not found!");
    }
  };

  return (
    <div className="w-full bg-gray-50 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        Find Your District Coverage
      </h1>

      {/* Search Input */}
      <div className="max-w-xl mx-auto mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Search district e.g. Dhaka"
          className="w-full px-4 py-2 border rounded-lg shadow"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Search
        </button>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg border">
          <MapContainer
            center={defaultCenter}
            zoom={7}
            scrollWheelZoom={false}
            className="w-full h-full"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Fly effect */}
            {selectedLocation && <FlyToLocation location={selectedLocation} />}

            {/* Markers */}
            {serviceCenter.map((service, index) => (
              <Marker
                key={index}
                position={[service.latitude, service.longitude]}
              >
                <Popup>
                  <h2 className="font-bold text-lg">{service.city}</h2>
                  <p>District: {service.district}</p>
                  <p>Region: {service.region}</p>
                  <p>Status: {service.status}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Coverage;
