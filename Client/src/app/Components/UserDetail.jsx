import UserDetailButton from '../Components/UserDetailButton'
import Image from 'next/image'

const UserDetail = ({ id, name, lastName, email, address, username, noButton = false, isWalker = false, image }) => {
  return (
    <div className="w-full h-full bg-[#29235c] flex items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <div className="relative w-20 h-20">
          {image ? (
            <Image src={image} alt="" layout="fill" objectFit="cover" className="rounded-full" />
          ) : (
            <Image src="/ProfileDetail.webp" alt="Default Profile" layout="fill" objectFit="cover" className="rounded-full" />
          )}
        </div>
        <h4 className="text-2xl font-bold text-white my-2">{name} {lastName}</h4>
        <p className="text-gray-300">{email}</p>
        <p className="text-gray-300">{address}</p>
        <p className="text-gray-300">Username: {username}</p>
        {!noButton && <UserDetailButton id={id} />}
      </div>
    </div>
  );
}

export default UserDetail;
