import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserDetails, setUserDetails, selectUserDetails } from '../../redux/features/detailSice';

const UserDetail = ({ users }) => {
  const [userId, setUserId] = useState(''); 
  const dispatch = useDispatch();
  const user = useSelector(selectUserDetails);

  // Function to fetch user details by dispatching the fetchUserDetails action
  const getUserDetails = async (userId) => {
    try {
      const response = await dispatch(fetchUserDetails(userId)); // Dispatching fetchUserDetails
      dispatch(setUserDetails(response.payload)); // Updating Redux state using setUserDetails
    } catch (error) {
      // Handle error if needed
      console.error('Error fetching user details:', error);
    }
  };

  // Call getUserDetails somewhere in your component lifecycle
  // For example, useEffect to fetch user details on component mount
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
