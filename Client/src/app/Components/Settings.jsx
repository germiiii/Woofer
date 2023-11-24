import React, { useState } from "react";

export default function Settings() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [address, setAddress] = useState("");
    const [image, setImage] = useState("");
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Acá debo poner la ruta a donde se mandan todos los datos que se actualizen
        console.log("Datos actualizados:", { name, lastName, email, username, address, image });
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        // Aca debo poner la ruta a donde se mmanda la contraseña nueva
        console.log("Contraseña actualizada:", newPassword);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={handleNameChange} />
                </label>
                <br />

                <label>
                    Lastname:
                    <input type="text" value={lastName} onChange={handleLastNameChange} />
                </label>
                <br />

                <label>
                    Email:
                    <input type="email" value={email} onChange={handleEmailChange} />
                </label>
                <br />

                <label>
                    Usearname:
                    <input type="text" value={username} onChange={handleUsernameChange} />
                </label>
                <br />

                <label>
                    Addres:
                    <input type="text" value={address} onChange={handleAddressChange} />
                </label>
                <br />

                <label>
                    Image:
                    <input type="text" value={image} onChange={handleImageChange} />
                </label>
                <br />

                <button type="submit">Save Changes</button>
            </form>

            <div>
                <p>Do you need to change your password? Click here:</p>
                <button onClick={() => setShowChangePassword(!showChangePassword)}>
                    {showChangePassword ? "Hide" : "Show"} Change Password
                </button>

                {showChangePassword && (
                    <form onSubmit={handlePasswordChange}>
                        <label>
                            New Password:
                            <input type="password" value={newPassword} onChange={handleNewPasswordChange} />
                        </label>
                        <br />

                        <button type="submit">Change Password</button>
                    </form>
                )}
            </div>
        </div>
    );
}
