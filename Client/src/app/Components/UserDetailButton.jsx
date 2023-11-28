"use client"
import { useRouter } from "next/navigation"

const UserDetailButton = ({id}) => {
    const router = useRouter()

    function handleClick(){
        router.push(`/users/${id}`)
    }
  return (
    <div>
        <button style={{cursor: 'pointer'}} onClick={handleClick}>
           More Detail
        </button>
    </div>
  )
}

export default UserDetailButton
