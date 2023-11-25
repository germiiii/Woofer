import UserDetail from "../../Components/UserDetail"

export async function generateStaticParams() {
    const res = await fetch('http://localhost:3001/users')
    const data = await res.json()

    return data.users.map((u) => ({
        id: u.id.toString(), //the file [id] expects a string
    }))
}

async function getUser(id) {
    const res = await fetch (`http://localhost:3001/users/${id}`)
    const data = await res.json()
    return data;
}

export default async function UserDetailPage({params}) {
   const user = await getUser(params.id)
   console.log({user})
  return (
    <div>
        <UserDetail noButton name={user.name} lastName={user.lastName} email={user.email} address={user.address}/>
    </div>
  )
}
