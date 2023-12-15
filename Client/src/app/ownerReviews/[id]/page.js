"use client";
import ReviewForm from "../../Components/OwnerReviews"
import { useParams } from "next/navigation";

export default function OwnerReviews() {
const params = useParams()
// console.log(params)
  return (
    <div>
      <ReviewForm id={params} />
    </div>
  );
}
