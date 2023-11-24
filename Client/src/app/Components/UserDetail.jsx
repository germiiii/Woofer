import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserDetails, setUserDetails, selectUserDetails } from '../../redux/features/userDetailSlice';

const UserDetail = ({ userId }) => {
  // const dispatch = useDispatch();
  // const userDetails = useSelector(selectUserDetails);

  // useEffect(() => {
  //   if (userId) {
  //     dispatch(fetchUserDetails(userId));
  //   }
  // }, [userId, dispatch]);


  return (
    <div>
      <h2>User Profile</h2>
    </div>
  );
  
};

export default UserDetail;

// return (
//   <div>
//     <h2>User Profile</h2>
//     {userDetails && (
//       <div>
//         <p>Name: {userDetails.name}</p>
//         <p>Last Name: {userDetails.lastName}</p>
//         <p>Username: {userDetails.username}</p>
//         <p>Email: {userDetails.email}</p>
//         <p>Address: {userDetails.address}</p>
//         {/* Display other user details similarly */}
//         {userDetails.isOwner ? (
//           <div>
//             <h3>Owner Details</h3>
//             <p>Dog Count: {userDetails.dog_count}</p>
//             {userDetails.dog_count >= 1 ? (
//               userDetails.dogs && userDetails.dogs.map((dog) => (
//                 <div key={dog.id}>
//                   <p>Name: {dog.name}</p>
//                   <p>Breed: {dog.breed}</p>
//                   <p>Size: {dog.size}</p>
//                   <p>Age: {dog.age}</p>
//                   <p>Image: {dog.image}</p>
//                 </div>
//               ))
//             ) : (
//               <p>No dogs have been added to your profile.</p>
//             )}
//           </div>
//         ) : (
//           <div>
//             <h3>Walker Details</h3>
//             <p>Dog Capacity: {userDetails.dog_capacity}</p>
//             <p>Is Available: {userDetails.is_available ? 'Yes' : 'No'}</p>
//           </div>
//         )}
//       </div>
//     )}
//   </div>
// );