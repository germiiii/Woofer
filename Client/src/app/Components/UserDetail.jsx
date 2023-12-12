"use client"
import { useEffect, useState } from 'react';
import UserDetailButton from '../Components/UserDetailButton';
import Image from 'next/image';

const UserDetail = ({ id, name, lastName, email, address, username, noButton = false, image }) => {
  const [provinceInput, setProvinceInput] = useState("");
  const [userProvince, setUserProvince] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    // Retrieve information from localStorage
    setProvinceInput(localStorage.getItem("provinceInput") || "");
    setUserProvince(localStorage.getItem("userProvince") || "");
    setUserAddress(localStorage.getItem("userAddress") || "");
    setAddressInput(localStorage.getItem("addressInput") || "");
    setSelectedType(localStorage.getItem("selectedType") || "");
  }, []); // The empty dependency array ensures this effect runs once on mount

  return (
    <div className="w-full h-full bg-[#29235c] flex items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <div className="relative w-20 h-20">
          {image ? (
            <Image src={image} alt="" layout="fill" objectFit="cover" className="rounded-full" />
          ) : (
            <Image src="/ProfileDetail.webp" alt="Default Profile" layout="fill" objectFit="cover" className="rounded-full" />
          )}
        </div>
        <h4 className="text-2xl font-bold text-white my-2">{name} {lastName}</h4>
        <p className="text-gray-300">{email}</p>
        <p className="text-gray-300">{address}</p>
        <p className="text-gray-300">Username: {username}</p>

        {/* Display information from state */}
        <p className="text-gray-300">Province Input: {provinceInput}</p>
        <p className="text-gray-300">User Province: {userProvince}</p>
        <p className="text-gray-300">User Address: {userAddress}</p>
        <p className="text-gray-300">Address Input: {addressInput}</p>
        <p className="text-gray-300">Selected Type: {selectedType}</p>

        {!noButton && <UserDetailButton id={id} />}
      </div>
    </div>
  );
}

export default UserDetail;
