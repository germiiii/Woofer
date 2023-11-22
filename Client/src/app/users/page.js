import React from "react";
import { useRouter } from "next/router";
import UserDetail from "../../Components/UserDetail";

const UserDetailPage = () => {
  const router = useRouter();
  const { id } = router.query; // Fetch the user ID from the URL query params

  return (
    <div>
      <h1>User Details</h1>
      {id && <UserDetail userId={id} />}
    </div>
  );
};

export default UserDetailPage;
