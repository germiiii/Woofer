"use client"
import { useRouter } from "next/navigation"

export default function UserDetailButton({id}) {
    const router = useRouter()

    function handleClick(){
        router.push(`/users/${id}`)
    }
  return (
    <div>
        <button onClick={handleClick}>
           More Detail
        </button>
    </div>
  )
}
