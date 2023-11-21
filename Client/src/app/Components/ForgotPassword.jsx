"use client";
import { useState } from 'react';
import Image from 'next/image';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
 
      const data = await response.json();

      setMessage(data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-indigo-200  p-6 max-w-md mx-auto mt-10 rounded-md shadow-md">
       <div className="flex justify-center">
        <Image
          src="/ISOWoofer.png"
          alt="logo"
          width={200}
          height={90}
          className="mx-auto"
        />
      </div>
      
      <form onSubmit={handleSubmit} className="mb-4">
      <h2 className="text-2xl f text-indigo-900 font-extrabold mb-4">RECOVER ACCOUNT</h2>
        <label className="block mb-2">
          E-mail address:
          <input
            className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <button
          type="submit"
          className="bg-indigo-900 text-white py-2 px-4 rounded-md hover:bg-gray-800"
        >
          Send 
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
  
};

export default ForgotPassword;
