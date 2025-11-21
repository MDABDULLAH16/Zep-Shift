import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  let serviceCenter = useLoaderData();

  // Ensure data is an array
  if (!Array.isArray(serviceCenter)) {
    serviceCenter = [serviceCenter];
  }

  // Center map on first location
  const position = [
    serviceCenter[0]?.latitude || 23.8103,
    serviceCenter[0]?.longitude || 90.4125,
  ];

  return (
    <div className="w-full bg-gray-50 py-10">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-6">
        We are available in <span className="text-blue-600">64 districts</span>
      </h1>

      {/* Map Wrapper */}
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg border">
          <MapContainer
            center={position}
            zoom={7}
            scrollWheelZoom={false}
            className="w-full h-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Dynamic Markers */}
            {serviceCenter.map((service, index) => (
              <Marker
                key={index}
                position={[service.latitude, service.longitude]}
              >
                <Popup>
                  <div className="space-y-1">
                    <h2 className="font-bold text-lg">{service.city}</h2>
                    <p>
                      <strong>Region:</strong> {service.region}
                    </p>
                    <p>
                      <strong>District:</strong> {service.district}
                    </p>
                    <p>
                      <strong>Status:</strong> {service.status}
                    </p>

                    <p>
                      <strong>Covered Area:</strong>
                    </p>
                    <ul className="list-disc ml-4">
                      {service.covered_area?.map((area, i) => (
                        <li key={i}>{area}</li>
                      ))}
                    </ul>

                    {service.flowchart && (
                      <img
                        src={service.flowchart}
                        alt="Flowchart"
                        className="mt-2 w-40 rounded border"
                      />
                    )}
                  </div>
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
