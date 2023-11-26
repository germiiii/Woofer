"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Settings() {
    const dispatch = useDispatch();
    const { name, lastname, email, address, username, password } = useSelector((state) => state.user);

    const [isEditingName, setIsEditingName] = useState(false);
    const [newName, setNewName] = useState(name);

    const handleNameClick = () => {
        setIsEditingName(true);
    };

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    const handleNameSave = () => {
        // Dispatch an action to update the name in the global state
        dispatch({ type: "UPDATE_NAME", payload: { newName } });

        // Disable editing mode
        setIsEditingName(false);
    };

    useEffect(() => {
        // Reset the new name if the user clicks outside the input without saving
        setNewName(name);
    }, [name]);

    return (
        <div>
            <div>
                Name: {isEditingName ? (
                    <input type="text" value={newName} onChange={handleNameChange} />
                ) : (
                    <span onClick={handleNameClick}>{name}</span>
                )}
            </div>
            <div>
                Lastname: {lastname}
            </div>
            <div>
                Email: {email}
            </div>
            <div>
                Address: {address}
            </div>
            <div>
                Username: {username}
            </div>
            <div>
                Password: ********
            </div>
        </div>
    );
}
