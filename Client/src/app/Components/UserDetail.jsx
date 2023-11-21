import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserDetails, setUserDetails, selectUserDetails } from '../../redux/features/detailSice';

const UserDetail = ({ users }) => {
  const [userId, setUserId] = useState(''); 
  const dispatch = useDispatch();
  const user = useSelector(selectUserDetails);

  const getUserDetails = async (userId) => {
    try {
      const response = await dispatch(fetchUserDetails(userId)); 
      dispatch(setUserDetails(response.payload)); 
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  
  useEffect(() => {
    const userId = 'someUserId'; // Replace 'someUserId' with the actual user ID
    getUserDetails(userId);
  }, []); 

  return (
    <div>
      <h1>User Details</h1>
      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)} // Actualizar el estado del ID del usuario
      />
      <button onClick={handleUserDetails}>Get User Details</button>

      {user && ( 
        <div>
          <p>Name: {user.name}</p>
          <p>Surname: {user.lastName}</p>
          <p>Email: {user.email}</p>
          <p>Address: {user.address}</p>
          <p>Rating: {user.rating}</p>
          <p>Reviews: {user.reviews}</p>
          <img src={user.image} alt={`User`} />
        </div>
      )}
    </div>
  );
};

export default UserDetail;
