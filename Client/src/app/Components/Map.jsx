"use client";
import { useState, useEffect, useRef } from "react";
import "tailwindcss/tailwind.css";
import "../stylesLanding.css";

const Map = (props) => {
  const [userLocation, setUserLocation] = useState(null);

  const userAddress = props.userAddress;
  const userProvince = props.userProvince;

  const mapRef = useRef(null);

  const handleSearchAddress = async () => {
    try {
      const formattedAddressInput = userAddress.replace(/(\d+)/, " $1");
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&street=${encodeURIComponent(
          formattedAddressInput
        )}&state=${encodeURIComponent(userProvince)}&country=Argentina`
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
    if (typeof window !== "undefined") {
      import("leaflet").then((L) => {
        if (userLocation) {
          if (mapRef.current) {
            mapRef.current.remove();
          }
          const map = L.map("map").setView(
            [userLocation.latitude, userLocation.longitude],
            16.3
          );
          mapRef.current = map;

          L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          ).addTo(map);

          const marker = L.marker([
            userLocation.latitude,
            userLocation.longitude,
          ]).addTo(map);

          var circle = L.circle(
            [userLocation.latitude, userLocation.longitude],
            {
              color: "red",
              fillColor: "#f03",
              fillOpacity: 0.2,
              radius: 800,
            }
          ).addTo(map);
        }
      });
      import("leaflet/dist/leaflet.css");
      import("leaflet-defaulticon-compatibility");
      import(
        "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
      );
    }
  }, [userLocation]);

  useEffect(() => {
    if (userAddress || userProvince) {
      handleSearchAddress();
    }
  }, [userAddress, userProvince]);

  const titleStyle = {
    fontSize: "2em",
    marginBottom: "16px",
  };

  const mapContainerStyle = {
    width: "1000px",
    height: "300px",
    borderRadius: "8px",
    marginTop: "25px",
  };

  const loadingMessageStyle = {
    fontSize: "1.7em",
    color: "grey",
  };

  const loadingMessageContainerStyle = {
    display: "flex",
    width: "1000px",
    height: "300px",
    borderRadius: "8px",
    border: "solid grey 1px",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div>
      <div style={mapContainerStyle}>
        {userLocation ? (
          <div id="map" style={mapContainerStyle}></div>
        ) : (
          <div style={loadingMessageContainerStyle}>
            {" "}
            <h1 style={loadingMessageStyle}>Waiting for Location...</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
