import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import jwt from "jsonwebtoken";

const UserDetailButton = () => {
  const router = useRouter();
  const currentPath = usePathname();

  function handleClick() {
    // Retrieve the login token from localStorage
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Decode the token to get user information
        const decodedToken = jwt.decode(token);

        // Check if the decoded token contains the user ID
        if (decodedToken && decodedToken.userId) {
          const userId = decodedToken.userId;

          // Redirect to the user detail page
          router.push(`/users/${userId}`);
        } else {
          console.error("Invalid token format");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.error("Token not found in localStorage");
    }
  }

  return (
    <div>
      <button
        className={`w-30 px-5 py-2 rounded-full bg-[#29235c] hover:text-[#F39200] ${
          currentPath.startsWith("/users/") ? "text-[#F39200]" : "text-white"
        } mt-3 lg:mt-0 mr-7 transition transition-colors duration-300`}
        style={{ cursor: "pointer" }}
        onClick={handleClick}
      >
        My Woofer
      </button>
    </div>
  );
};

export default UserDetailButton;
