import UserDetail from '../Components/UserDetail'

async function getUsers() {
  const res = await fetch('https://woofer-server-nsjo.onrender.com/users')
  const data = await res.json()
  console.log('page at users:', data)
  return data
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



   
  
