
// Importaciones
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../redux/features/detailSlice";
import axios from "axios";
import "tailwindcss/tailwind.css";

export default function Settings() {
  const dispatch = useDispatch();
  const { name, lastname, email, address, userName, image } = useSelector(
    (state) => state.userDetail.user
  );
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newLastname, setNewLastname] = useState(lastname);
  const [newAddress, setNewAddress] = useState(address);
  const [newUserName, setNewUserName] = useState(userName);
  const [newImage, setNewImage] = useState(image);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleLastnameChange = (e) => {
    setNewLastname(e.target.value);
  };

  const handleAddressChange = (e) => {
    setNewAddress(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setNewUserName(e.target.value);
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewImage(reader.result);
    };
    reader.readAsDataURL(imageFile);
  };

  const renderEditableField = (label, value, onChange, isEditable = true) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          {label}:
        </label>
        <div className={`mt-1 ${isEditing && isEditable ? '' : 'bg-white p-2 rounded border border-gray-300'}`}>
          {isEditing && isEditable ? (
            <input
              type="text"
              value={value}
              onChange={onChange}
              className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
            />
          ) : (
            <span
              onClick={handleClick}
              className={`cursor-pointer text-gray-500 ${
                value ? "hover:text-blue-500" : ""
              }`}
            >
              {value || `Enter your ${label.toLowerCase()}...`}
            </span>
          )}
        </div>
      </div>
    );
  };

  const saveChanges = async () => {
    const userSettingChange = {
      name: newName,
      lastname: newLastname,
      address: newAddress,
      userName: newUserName,
      image: newImage,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/register",
        userSettingChange
      );
      console.log("Registro exitoso:", response.data);
    } catch (e) {
      window.alert("Fallo en el registro.");
      console.log("Registro sin éxito:", e.message);
    }

    setIsEditing(false);
    dispatch(setUserDetails(userSettingChange));
  };

  useEffect(() => {
    setNewName(name);
    setNewLastname(lastname);
    setNewAddress(address);
    setNewUserName(userName);
    setNewImage(image);
  }, [name, lastname, address, userName, image]);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveChanges();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 bg-indigo-200 rounded shadow-md">
      <div>
        {renderEditableField("Name", newName, handleNameChange)}
        {renderEditableField("Lastname", newLastname, handleLastnameChange)}
        {renderEditableField("Email", email, () => {}, false)}
        {renderEditableField("Address", newAddress, handleAddressChange)}
        {renderEditableField("Username", newUserName, handleUserNameChange)}

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Profile Picture:
        </label>
        <div className={`mt-1 ${isEditing ? '' : 'bg-white p-2 rounded border border-gray-300'}`}>
          {isEditing ? (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
              />
              {newImage && (
                <img
                  src={newImage}
                  alt="Profile"
                  className="mt-2 rounded"
                  style={{ maxWidth: '100px', maxHeight: '100px' }}
                />
              )}
            </>
          ) : (
            <span
              onClick={handleClick}
              className="cursor-pointer text-gray-500 hover:text-blue-500"
            >
              {newImage ? (
                <img
                  src={newImage}
                  alt="Profile"
                  className="mt-2 rounded"
                  style={{ maxWidth: '100px', maxHeight: '100px' }}
                />
              ) : 'Upload Profile Picture'}
            </span>
          )}
        </div>


          if you need to change your password, click here :{" "}
          <button className="bg-indigo-900 text-white py-2 px-4 rounded focus:outline-none hover:bg-blue-600">change password</button>

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
