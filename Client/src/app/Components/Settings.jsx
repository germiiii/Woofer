"use client"
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "../../redux/features/userDetailSlice";
import "tailwindcss/tailwind.css";
import Image from 'next/image'
import { useRouter } from "next/navigation";

const Settings = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { name, lastName, email, address, userName, image } = useSelector((state) => state.userDetail.user);

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name || ''); 
  const [newLastname, setNewLastname] = useState(lastName || ''); 
  const [newAddress, setNewAddress] = useState(address || ''); 
  const [newUserName, setNewUserName] = useState(userName || ''); 
  const [newImage, setNewImage] = useState(image);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e) => {
    dispatch(updateUserDetails({ name: e.target.value }));
  };

  const handleLastnameChange = (e) => {
    dispatch(updateUserDetails({ lastName: e.target.value }));
  };

  const handleAddressChange = (e) => {
    dispatch(updateUserDetails({ address: e.target.value }));
};

const handleUserNameChange = (e) => {
  dispatch(updateUserDetails({ userName: e.target.value }));
};

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewImage(reader.result);
    };
    reader.readAsDataURL(imageFile);
    dispatch(updateUserDetails({ image: newImage }));
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
              {value || `Change your ${label.toLowerCase()}...`}
            </span>
          )}
        </div>
      </div>
    );
  };

  const saveChanges = async () => {
    const userSettingChange = {
      name: newName,
      lastName: newLastname,
      address: newAddress,
      userName: newUserName,
      image: newImage,
    };
  
    if (!newName && !newLastname && !newAddress && !newUserName && !newImage) {
      alert("No changes have been made");
      router.push('/home');
    } else {
      setIsEditing(false);
      dispatch(updateUserDetails(userSettingChange));
      alert("Changes have been saved successfully!");
      router.push('/home');
    }
  };
  

  useEffect(() => {
    setNewName(name);
    setNewLastname(lastName);
    setNewAddress(address);
    setNewUserName(userName);
    setNewImage(image);
  }, [name, lastName, address, userName, image]);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveChanges();
  };

  return (
    <div>
    <div className="flex justify-center">
     
    </div>
   <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 bg-indigo-200 rounded shadow-md">
   <Image
        src="/ISOWoofer.png"
        alt="logo"
        width={200}
        height={90}
        className="mx-auto"
      />
   <h1 className="text-2xl text-indigo-900 font-extrabold mb-4">
              MANAGE PROFILE SETTINGS
    </h1>
      <div>
        {renderEditableField("Name", newName, handleNameChange)}
        {renderEditableField("Lastname", newLastname, handleLastnameChange)}
        {/* {renderEditableField("Email", email, () => {}, false)} */}
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
                <Image
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
                <Image
                  src={newImage}
                  alt="Profile"
                  className="mt-2 rounded"
                  style={{ maxWidth: '100px', maxHeight: '100px' }}
                />
              ) : 'Upload Profile Picture'}
            </span>
          )}
        </div>


        <div>
          <p>To change password, click{' '}
         
         <a href="/forget-password" className="text-blue-500 hover:underline">here</a>
         </p>
        </div>
       
        <button type="submit" className="px-4 py-3 rounded-full bg-[#29235c] text-white hover:bg-amber-400 hover:text-black border mt-3 lg:mt-0 mr-5">Save</button>
      </div>
    </form> 
    </div>
  );
}

export default Settings
