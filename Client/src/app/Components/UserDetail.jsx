import UserDetailButton from '../Components/UserDetailButton'

export default function UserDetail({id, name, lastName, email, address, noButton = false}) {
  return (
    <div style={{border: '1px solid black', margin: '20px', padding: '20px'}}>
      <h4>{name}</h4>
      <h4>{lastName}</h4>
      <h4>{email}</h4>
      <h4>{address}</h4> 
      {
        !noButton &&  <UserDetailButton id={id}/>
      }
     
    </div>
  )
}

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