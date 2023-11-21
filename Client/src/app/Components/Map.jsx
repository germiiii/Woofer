"use client";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export default function Map(props) {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const handleGetLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });
          },
          (error) => {
            console.error("Error al obtener la ubicación:", error.message);
          }
        );
      } else {
        console.error("Geolocalización no es compatible en este navegador");
      }
    };

    if (!userLocation) {
      handleGetLocation();
    } else {
      const map = L.map("map").setView(
        [userLocation.latitude, userLocation.longitude],
        16.3
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        map
      );

      const marker = L.marker([
        userLocation.latitude,
        userLocation.longitude,
      ]).addTo(map);
      map.panTo([userLocation.latitude, userLocation.longitude]);

      var circle = L.circle([userLocation.latitude, userLocation.longitude], {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.2,
        radius: 800,
      }).addTo(map);
    }
  }, [userLocation]);

  const titleStyle = {
    fontSize: "2em",
    marginBottom: "16px",
  };

  return (
    <div>
      <h1 style={titleStyle}>Your location</h1>
      <div>
        {userLocation ? (
          <div>
            <div
              id="map"
              style={{
                width: "1000px",
                height: "300px",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            ></div>
          </div>
        ) : (
          <p>Obteniendo ubicación...</p>
        )}
      </div>
    </div>
  );
}
