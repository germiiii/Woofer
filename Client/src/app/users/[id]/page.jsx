import UserDetail from "../../Components/UserDetail"
import "tailwindcss/tailwind.css";

async function generateStaticParams() {
  const res = await fetch('https://woofer-server-nsjo.onrender.com/users')
  const data = await res.json()

  return data.users.map((u) => ({
    params: {
      id: u.id.toString(), //the file [id] expects a string
    }
  }))
}

async function getUser(id) {
  const res = await fetch (`https://woofer-server-nsjo.onrender.com/users/${id}`)
  const data = await res.json()
  return data;
}

export default async function UserPage({params}) {
  const user = await getUser(params.id)

  console.log({params})

  return (
    <div className="border border-indigo-300 m-4 p-4">
      {user && (
        <div className="p-4">
          <h1 className="text-2xl mb-4 font-bold text-indigo-500">User Profile</h1>
          <UserDetail
            noButton
            image={user.image ? <img src={user.image} alt="" height="100px" width="100px" /> : "/ProfileDetail.webp"}
            name={user.name}
            lastName={user.lastName}
            username={user.username}
            address={user.address}
            email={user.email}
          />
          {user.isWalker === true ? (
            <div className="mt-4">
              <h3 className="text-xl mb-2 font-semibold">Owner Details</h3>
              <p className="mb-2">Dog Count: {user.dog_count}</p>
              {user.dog_count >= 1 ? (
                user.dogs &&
                user.dogs.map((dog) => (
                  <div key={dog.id} className="border border-indigo-300 rounded p-4 my-2">
                    <p className="mb-1">Name: {dog.name}</p>
                    <p className="mb-1">Breed: {dog.breed}</p>
                    <p className="mb-1">Size: {dog.size}</p>
                    <p className="mb-1">Age: {dog.age}</p>
                    <p className="mb-1">Image: {dog.image}</p>
                  </div>
                ))
              ) : (
                <p className="mb-2">No dogs have been added to your profile.</p>
              )}
            </div>
          ) : (
            <div className="mt-4">
              <h3 className="text-xl mb-2 font-semibold text-indigo-700">Walker Details</h3>
              <p className="mb-2">Dog Capacity: {user.dog_capacity || 'No information added'}</p>
              <p className="mb-2">Is Available: {user.is_available ? 'Yes' : 'No'}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
  
}