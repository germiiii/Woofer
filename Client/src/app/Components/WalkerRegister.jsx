import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";

const WalkerRegister = () => {
    const [priceList, setPriceList] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [saleDetails, setSaleDetails] = useState("");
    const [formSubmissionError, setFormSubmissionError] = useState(null);

    useEffect(() => {
        const fetchWalkerTypes = async () => {
            try {
                const API = process.env.NEXT_PUBLIC_APIURL;
                const response = await axios.get(`${API}/walkType`);
                setPriceList(response.data.walkTypeData);
            } catch (error) {
                console.error("Error fetching walker types:", error);
            }
        };

        fetchWalkerTypes();
    }, []);

    const handleCheckboxChange = (option) => {
        const isSelected = selectedOptions.includes(option);

        if (isSelected) {
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    const handleCardClick = (option) => {
        handleCheckboxChange(option);
    };

    const isSelected = (option) => selectedOptions.includes(option);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const API = process.env.NEXT_PUBLIC_APIURL;
            const token = localStorage.getItem('token');

            if (!token) {
                // Handle the case where there is no token
                return;
            }

            const decodedToken = jwt.decode(token);
            const walkerId = decodedToken.id;

            const dogSizes = Array.from(new Set(selectedOptions.flatMap((option) => option.dog_capacity.toLowerCase())));
            const walkDurations = Array.from(new Set(selectedOptions.flatMap((option) => option.walk_duration)));
            
            const requestBody = {
                id: "285f357e-69d5-4cbe-8289-3168d71972cd",
                dog_capacity: dogSizes.join(", "), // Combine dog sizes into a comma-separated string
                dog_size: dogSizes,
                walk_duration: walkDurations,
                sale_details: saleDetails,
                is_available: "false",
                walkTypes: selectedOptions.map((option) => option.id),
            };
            console.log(requestBody);
            const response = await axios.post(`${API}/walker/${walkerId}`, requestBody);

            // Handle the response as needed (e.g., show a success message)
            console.log("Formulario enviado con éxito:", response.data);
        } catch (error) {
            setFormSubmissionError("Error al enviar el formulario");
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div>
            <h2>Walker Registration</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Seleccione los tipos de paseo:</label>
                    {priceList.map((option) => (
                        <div
                            key={option.id}
                            className={`card ${isSelected(option) ? "selected-card" : ""}`}
                            onClick={() => handleCardClick(option)}
                        >
                            <input
                                type="checkbox"
                                id={option.id}
                                value={option.title}
                                checked={isSelected(option)}
                                onChange={() => handleCheckboxChange(option)}
                                style={{ display: "none" }}
                            />
                            {option.title} - Price: {option.price}, Walk Duration: {option.walk_duration}, Walk Type: {option.walk_type}, Dog Capacity: {option.dog_capacity}
                        </div>
                    ))}
                </div>
                <div>
                    <label htmlFor="saleDetails">Detalles de la oferta (máximo 100 caracteres):</label>
                    <input
                        type="text"
                        id="saleDetails"
                        value={saleDetails}
                        onChange={(e) => setSaleDetails(e.target.value)}
                        maxLength={100}
                    />
                </div>
                <button type="submit">Enviar</button>
            </form>
            {formSubmissionError && <p style={{ color: "red" }}>{formSubmissionError}</p>}
            <style jsx>{`
                .card {
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    margin: 5px;
                    padding: 10px;
                    display: block;
                    cursor: pointer;
                }

                .selected-card {
                    background-color: gray; /* Cambia el color de fondo a gris cuando está seleccionado */
                }
            `}</style>
        </div>
    );
};

export default WalkerRegister;
