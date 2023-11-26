import UserDetail from "../../Components/UserDetail"

async function generateStaticParams() {
  const res = await fetch('http://localhost:3001/users')
  const data = await res.json()

  return data.users.map((u) => ({
    params: {
      id: u.id.toString(), //the file [id] expects a string
    }
  }))
}

// export async function getStaticPaths() {
//   const paths = await generateStaticParams();
//   return {
//     paths,
//     fallback: false // or 'blocking' if using fallback
//   };
// }

// export async function getStaticProps({ params }) {
//   const user = await getUser(params.id);
//   return {
//     props: {
//       user
//     }
//   };
// }

async function getUser(id) {
  const res = await fetch (`http://localhost:3001/users/${id}`)
  const data = await res.json()
  return data;
}

export default function UserDetailPage({ user }) {
  console.log({ user });
  return (
    <div>
      <UserDetail noButton name={user.name} lastName={user.lastName} email={user.email} address={user.address}/>
    </div>
  )
}
