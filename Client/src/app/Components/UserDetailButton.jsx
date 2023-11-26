// "use client"
// import { useRouter } from "next/navigation"

// export default function UserDetailButton({id}) {
//     const router = useRouter()

//     function handleClick(){
//         router.push(`/users/${id}`)
//     }
//   return (
//     <div>
//         <button onClick={handleClick}>
//            More Detail
//         </button>
//     </div>
//   )
// }

import Link from "next/link";

export default function UserDetailButton({ id }) {
  return (
    <div>
      <Link href={`/users/${id}`}>
        <button>More Detail</button>
      </Link>
    </div>
  );
}

