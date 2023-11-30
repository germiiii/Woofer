import UserDetailButton from '../Components/UserDetailButton'
import Image from 'next/image'


const UserDetail = ({ id, name, lastName, email, address, username, noButton = false, isWalker = false, image }) => {
  return (
    <div>
      <div>
      
        {image ? (
          <Image src={image} alt="" height={100} width={100} />
        ) : (
          <Image src="/ProfileDetail.webp" alt="Default Profile" height={100} width={100} />
        )}
      </div>
      <h4>Name: {name}</h4>
      <h4>Surname: {lastName}</h4>
      <h4>Email address: {email}</h4>
      <h4>Home address: {address}</h4>
      <h4>Username: {username}</h4>
      {!noButton && <UserDetailButton id={id} />}
    </div>
  );
}

export default UserDetail
