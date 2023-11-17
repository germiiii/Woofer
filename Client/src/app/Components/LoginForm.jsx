
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
    <div>
      <form onSubmit={handleSubmit} method='post'>
        <h1>SIGN IN</h1>
        <label>
          Email
          <input
            type='email'
            name='email'
            placeholder='Enter your email address'
            value={email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password
          <input
            type='password'
            name='password'
            placeholder='Enter your password'
            value={password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type='submit'>Sign In</button>
      </form>
      <div>
        <Link href="/register">
          <p>Register if you don't have an account.</p>
        </Link>
      </div>
    </div>
  );
}
