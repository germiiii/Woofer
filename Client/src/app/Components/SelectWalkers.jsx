"use client";
import axios from "axios";
import WalkerCard from "./WalkerCard.jsx";
import { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import "../stylesLanding.css";

const SelectWalkers = (props) => {
  const api = process.env.NEXT_PUBLIC_APIURL;

  const [walkers, setWalkers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogCapacityFilter, setDogCapacityFilter] = useState("");
  const [walkDurationFilter, setWalkDurationFilter] = useState("");
  const [dogSizeFilter, setDogSizeFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const cardsPerPage = 3;
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = currentPage * cardsPerPage;
  const userProvince = props.userProvince;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/walker/available`);
        setWalkers(response.data.walkers);
      } catch (error) {
        console.error("Error fetching walkers:", error);
      }
    };
    fetchData();
  }, []);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const maxPage = Math.ceil(walkers.length / cardsPerPage);
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDogCapacityFilterChange = (event) => {
    setDogCapacityFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleWalkDurationFilterChange = (event) => {
    setWalkDurationFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleDogSizeFilterChange = (event) => {
    setDogSizeFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleSearchFilterChange = (event) => {
    setSearchFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    setDogCapacityFilter("");
    setWalkDurationFilter("");
    setDogSizeFilter("");
    setCurrentPage(1);
  };

  const filteredWalkers = walkers.filter((walker) => {
    const dogCapacityFilterCondition =
      !dogCapacityFilter ||
      (dogCapacityFilter === "1" && walker.walker.dog_capacity === 1) ||
      (dogCapacityFilter === "<3" && walker.walker.dog_capacity < 3) ||
      (dogCapacityFilter === "<5" && walker.walker.dog_capacity < 5) ||
      (dogCapacityFilter === ">5" && walker.walker.dog_capacity > 5);

    const walkDurationFilterCondition =
      !walkDurationFilter ||
      (walkDurationFilter === "15" &&
        walker.walker.walk_duration.includes("15")) ||
      (walkDurationFilter === "30" &&
        walker.walker.walk_duration.includes("30")) ||
      (walkDurationFilter === "60" &&
        walker.walker.walk_duration.includes("60"));

    const searchFilterCondition = !searchFilter
      ? true
      : searchFilter
          .toLowerCase()
          .split(" ")
          .every(
            (word) =>
              walker.name.toLowerCase().includes(word) ||
              walker.lastName.toLowerCase().includes(word)
          );

    return (
      dogCapacityFilterCondition &&
      walkDurationFilterCondition &&
      searchFilterCondition &&
      walker.province === userProvince
    );
  });

  // console.log(walkers);

  const renderList = filteredWalkers
    .slice(startIndex, endIndex)
    .map((walker) => (
      <WalkerCard
        key={walker.id}
        id={walker.id}
        name={walker.name}
        lastName={walker.lastName}
        address={walker.address}
        image={walker.image}
        dogCapacity={walker.walker.dog_capacity}
        walkDuration={walker.walker.walk_duration}
        dogSize={walker.walker.dog_size}
      />
    ));

  const noWalkersMessageStyle = {
    fontSize: "1.5em",
    marginTop: "20px",
  };

  return userProvince ? (
    <div className="flex flex-col items-center mt-15">
      <div className="mt-10 mb-12 flex flex-col ">
        <h1
          className="text-5xl text-[#29235c]"
          style={{ fontFamily: "LikeEat" }}
        >
          Select a walker from
        </h1>
        <h1 className="text-3xl text-[#F39200]">{props.userProvince}</h1>
      </div>
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="search by name or last name"
          value={searchFilter}
          onChange={handleSearchFilterChange}
          className="border p-2  mr-2 mb-4"
        />
        <div className="mb-4">
          <select
            className="border p-2 mr-2"
            value={dogCapacityFilter}
            onChange={handleDogCapacityFilterChange}
          >
            <option value="">filter by dog capacity</option>
            <option value="1">one dog</option>
            <option value="<3">less than three dogs</option>
            <option value="<5">less than five dogs</option>
            <option value=">5">more than five dogs</option>
          </select>
          <select
            className="border p-2 mr-2"
            value={walkDurationFilter}
            onChange={handleWalkDurationFilterChange}
          >
            <option value="">filter by walk duration </option>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">60 minutes</option>
          </select>
          <button
            onClick={handleRefresh}
            className="w-30 px-5 py-2 rounded-full bg-[#F39200] text-white font-bold hover:text-[#29235c] transition transition-colors duration-300"
          >
            refresh
          </button>
        </div>
      </div>
      {renderList.length > 0 ? (
        <div className="mt-5 h-[342px]">{renderList}</div>
      ) : (
        <div className="flex items-center justify-center h-[362px]">
          <h2 className="text-[#29235c] font-bold">no walkers found.</h2>
        </div>
      )}
      <div className="mb-8 mt-10">
        <button
          onClick={handlePreviousPage}
          className="bg-[#29235c] text-[#F39200] px-3 py-2"
        >
          ←
        </button>
        <span className="text-[#29235c] font-bold ml-10 mr-10">{`${currentPage}`}</span>
        <button
          onClick={handleNextPage}
          className="bg-[#29235c] text-[#F39200] px-3 py-2"
        >
          →
        </button>
      </div>
    </div>
  ) : null;
};

export default SelectWalkers;
