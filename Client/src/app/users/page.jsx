import UserDetail from '../Components/UserDetail'
import axios from 'axios'

async function getUsers() {

  const api = process.env.NEXT_PUBLIC_APIURL

  try {
    const response = await axios(`${api}/users`);
    const data = response.data;
    console.log('page at users:', data);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

export default async function Users() {
  const users = await getUsers()
  // console.log({users}) --> good

  return (
    <>
    <h1>Users</h1>
      {
        users.length > 0 && (
          users.map(({id, name, lastName, email, username, address}) => 
          <UserDetail key={id} id={id} name={name} lastName={lastName} username={username} email={email} address={address}/>)
        )
      } 
    </>
  )
}



   
  
