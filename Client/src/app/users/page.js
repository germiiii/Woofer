import UserDetail from '../Components/UserDetail'

async function getUsers() {
  const res = await fetch('http://localhost:3001/users')
  const data = await res.json()
  return data.users
}

export default async function Users() {
  const users = await getUsers()
  console.log({users})

  return (
    <>
    <h1>Users</h1>
      {
        users.length > 0 && (
          users.map(({id, name, lastName, email}) => 
          <UserDetail key={id} name={name} lastName={lastName} email={email}/>)
        )
      }
    </>
  )
}