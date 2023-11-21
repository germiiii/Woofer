import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserDetails, updateUserDetails } from '<import>/redux/features/detailSice';

const UserDetail = ({ users }) => {
  const [userId, setUserId] = useState(''); 
  const user = useSelector(selectUserDetails);
  const dispatch = useDispatch(); 

  const handleUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/users/${userId}`); 
      dispatch(updateUserDetails(response.data)); // Actualizar los detalles del usuario en el estado global
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

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
