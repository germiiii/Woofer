// pages/userDetails.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const UserDetail = ({ users }) => { //Whatever you return from getServerSideProps as props will be available as props in your component
  return (
    <div>
      <h1>User Details</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p>Name: {user.name}</p>
            <p>Surname: {user.lastName}</p>
            <p>Email: {user.email}</p>
            <p>Address: {user.address}</p>
            <p>Rating: {user.rating}</p>
            <p>Reviews: {user.reviews}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function getServerSideProps() {
 
  const res = await axios.get('http://localhost:3001/users'); 

  return {
    props: {
      users: res.data || [], 
    },
  };
}

export default UserDetail;
