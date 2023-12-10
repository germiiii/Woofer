import React, { useState, useEffect } from "react";
import axios from "axios";

const WalkerRegister = () => {
    const [priceList, setPriceList] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Formulario enviado:", { selectedOptions });
    };

    return (
        <div>
            <h2>Walker Registration</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Seleccione los tipos de paseo:</label>
                    {priceList.map((option) => (
                        <div key={option.id} style={{ border: "1px solid #ccc", borderRadius: "8px", margin: "5px", padding: "10px" }}>
                            <input
                                type="checkbox"
                                id={option.id}
                                value={option.title}
                                checked={selectedOptions.includes(option)}
                                onChange={() => handleCheckboxChange(option)}
                            />
                            <label htmlFor={option.id}>
                                {option.title} - Price: {option.price}, Walk Duration: {option.walk_duration}, Walk Type: {option.walk_type}, Dog Capacity: {option.dog_capacity}
                            </label>
                        </div>
                    ))}
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default WalkerRegister;
