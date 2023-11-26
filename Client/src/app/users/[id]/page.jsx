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

async function getUser(id) {
  const res = await fetch (`http://localhost:3001/users/${id}`)
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
          <h2 className="text-2xl mb-4">User Profile</h2>
          <UserDetail
            noButton
            name={user.name}
            lastName={user.lastName}
            username={user.username}
            address={user.address}
            email={user.email}
          />
          {user.isWalker === true ? (
            <div className="mt-4">
              <h3 className="text-xl mb-2">Owner Details</h3>
              <p>Dog Count: {user.dog_count}</p>
              {user.dog_count >= 1 ? (
                user.dogs &&
                user.dogs.map((dog) => (
                  <div key={dog.id} className="border border-indigo-300 rounded p-4 my-2">
                    <p>Name: {dog.name}</p>
                    <p>Breed: {dog.breed}</p>
                    <p>Size: {dog.size}</p>
                    <p>Age: {dog.age}</p>
                    <p>Image: {dog.image}</p>
                  </div>
                ))
              ) : (
                <p>No dogs have been added to your profile.</p>
              )}
            </div>
          ) : (
            <div className="mt-4">
              <h3 className="text-xl mb-2">Walker Details</h3>
              <p>Dog Capacity: {user.dog_capacity || 'No information added'}</p>
              <p>Is Available: {user.is_available ? 'Yes' : 'No'}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}