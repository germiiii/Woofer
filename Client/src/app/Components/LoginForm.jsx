import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Change 'next/navigation' to 'next/router'
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const googleAuth = new GoogleAuthProvider();
  const [user] = useAuthState(auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const loginGoogle = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, googleAuth);
      const { user } = result;
      console.log(user);

      const email = user.email;
      console.log(email);

      const response = await axios.post('http://localhost:3001/googleLogin', { email });

      if (response.status === 201) {
        router.push('/home');
      } else {
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error(error);
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
      console.log(token);

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
      <div className="flex justify-center">
        <Image
          src="/ISOWoofer.png"
          alt="logo"
          width={200}
          height={90}
          className="mx-auto"
        />
      </div>

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
        <div>
          <button className="px-4 py-3 rounded-full bg-[#29235c] text-white hover:bg-amber-400 hover:text-black border mt-3 lg:mt-0 mr-5" type="submit">
            Sign In
          </button>
        </div>

        <div>
          <button onClick={loginGoogle} className="bg-white text-indigo-900 px-4 py-3 rounded flex items-center justify-center focus:outline-none hover:bg-amber-400" type="button">
            <Image src={'/google.png'} alt="Google Logo" className="w-6 h-6 mr-2" />
            <span>Login with Google</span>
          </button>
        </div>
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
