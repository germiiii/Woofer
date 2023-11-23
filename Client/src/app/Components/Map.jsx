"use client";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export default function Map(props) {
  const [userLocation, setUserLocation] = useState(null);
  const [addressInput, setAddressInput] = useState("");

  const handleAddressInputChange = (event) => {
    setAddressInput(event.target.value);
  };

  const handleSearchAddress = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          addressInput
        )}`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        setUserLocation({
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
        });
      } else {
        window.alert(
          "No se encontraron coordenadas para la dirección ingresada"
        );
      }
    } catch (error) {
      window.alert("Error al buscar la dirección:", error.message);
    }
  };

  useEffect(() => {
    if (userLocation) {
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

  const mapContainerStyle = {
    width: "1000px",
    height: "300px",
    borderRadius: "8px",
    overflow: "hidden",
    position: "relative",
  };

  const loadingMessageStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div>
      <h1 style={titleStyle}>Your location</h1>
      <input
        type="text"
        placeholder="Enter your address"
        value={addressInput}
        onChange={handleAddressInputChange}
      />
      <button onClick={handleSearchAddress}>Search Address</button>
      <div style={mapContainerStyle}>
        {userLocation ? (
          <div id="map" style={mapContainerStyle}></div>
        ) : (
          <p style={loadingMessageStyle}>Waiting for address...</p>
        )}
      </div>
    </div>
  );
}
