"use client";
import { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {

  const api = process.env.NEXT_PUBLIC_APIURL

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${api}/reset-password`, { //! a qué URL estamos haciendo la petición?
        email: email, // Assuming 'email' is defined somewhere
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = response.data;
  
      setMessage(data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Recover account</h2>
      <form onSubmit={handleSubmit}>
        <label>
          E-mail addres:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <button type="submit">Send Form</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
