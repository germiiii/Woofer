import UserDetailButton from '../Components/UserDetailButton'


export default function UserDetail({id, name, lastName, email, address, username, noButton = false, isWalker = false}) {
  return (
    <div >
      <h4>Name: {name}</h4>
      <h4>Surname: {lastName}</h4>
      <h4>Email address: {email}</h4>
      <h4>Home address: {address}</h4> 
      <h4>Username: {username}</h4>
      {
        !noButton &&  <UserDetailButton id={id}/>
      }
     
    </div>
  )
}

