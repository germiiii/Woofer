
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import Link from 'next/link';
import axios from 'axios';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password,
      });

      const { token } = response.data;
      console.log(token)

      if (token) {
        // Login successful
        alert('Welcome!');
        setIsLoggedIn(true);
        router.push('/home');
      } else {
        // Login failed
        alert('Invalid credentials.');
      }
    } catch (error) {
      alert('An error occurred while trying to login. Please try again later.');
      console.error('Error:', error.message);
    }
  };

  if (isLoggedIn) {
    return <p>Redirecting...</p>; // You can replace this with a loading indicator or something similar
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-indigo-200 rounded shadow-md">
      <form onSubmit={handleSubmit} method="post">
        <h1 className="text-2xl text-indigo-900 font-extrabold mb-4">SIGN IN</h1>
        <label className="block mb-2">
          Email
          <input
            className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="block mb-2">
          Password
          <input
            className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button className="bg-indigo-900 text-white py-2 px-4 rounded focus:outline-none hover:bg-blue-600" type="submit">
          Sign In
        </button>
      </form>
  
      <div className="mt-4">
        <p className="text-sm">
          Don't have an account yet? Register <a href="/register" className="text-blue-500">here.</a>
        </p>
      </div>
      <div className="mt-2">
        <p className="text-sm">
          Don't remember your password? Recover your password <a href="/forget-password" className="text-blue-500">here.</a>
        </p>
      </div>
    </div>
  );
  
}
