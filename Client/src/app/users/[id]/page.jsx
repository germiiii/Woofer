"use client";
import React from "react";
import UserDetail from "../../Components/UserDetail";
import "tailwindcss/tailwind.css";
import Image from "next/image";
import NavBarHome from "../../Components/NavBarOwner";
import Link from "next/link.js";
import axios from "axios";

export default function UserPage({ params }) {
  const [user, setUser] = React.useState(null);
  const [selectedType, setSelectedType] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const dogsPerPage = 3;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_APIURL}/users/${params.id}`
        );
        const data = response.data;
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    fetchData();
  }, [params.id]);

  React.useEffect(() => {
    setSelectedType(localStorage.getItem("selectedType") || "");
  }, []);

  const renderDogs = () => {
    if (user && user.owner && user.owner.dogs) {
      const currentDogs = user.owner.dogs.slice(
        (currentPage - 1) * dogsPerPage,
        currentPage * dogsPerPage
      );

      return currentDogs.map((dog, index) => (
        <div
          key={index}
          className="flex items-center h-[150px] w-[400px] mt-10 bg-[#29235c] rounded-md"
        >
          <div className="rounded-full border border-[#F39200] border-2 overflow-hidden ml-5">
            <Image
              src={dog.img}
              alt={`Dog Preview ${index}`}
              height={0}
              width={100}
              className="max-w-[100px] max-h-[100px]"
            />
          </div>
          <div className="flex ml-10 flex-col">
            <h2 className="text-2xl text-[#F39200]">{dog.name}</h2>
            <p className="text-white">age: {dog.age}</p>
            <p className="text-white">size: {dog.size}</p>
            <p className="text-white">breed: {dog.breed}</p>
          </div>
        </div>
      ));
    } else {
      return <h2 className="text-2xl text-[#29235c] mt-10">No dogs found.</h2>;
    }
  };

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil((user?.owner?.dogs?.length || 0) / dogsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-col">
      {user && selectedType === "owner" ? (
        <div>
          <NavBarHome />
          <div>
            <div className="flex flex-grow">
              <div className="bg-[#E4E2ED] w-1/2 flex flex-col items-center">
                <h1
                  className="text-5xl text-[#29235c] mt-10"
                  style={{ fontFamily: "LikeEat" }}
                >
                  Your dogs
                </h1>
                <div className="flex flex-col mt-10 items-center justify-center h-[550px]">
                  {renderDogs()}
                </div>
                <div className="mt-4">
                  {pageNumbers.map((number) => (
                    <span
                      key={number}
                      onClick={() => paginate(number)}
                      className={`mr-2 cursor-pointer font-bold ${
                        number === currentPage ? "text-[#29235c]" : "text-white"
                      }`}
                    >
                      {number}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-1/2 bg-[#29235c] flex flex-col items-center h-screen">
                <UserDetail
                  noButton
                  image={user.image}
                  name={user.name}
                  lastName={user.lastName}
                  username={user.username}
                  address={user.address}
                  email={user.email}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>You are not an owner.</h1>
          <Link href={"/walkerHome"}>
            <button>back to walker home</button>
          </Link>
        </div>
      )}
    </div>
  );
}
