"use client";
import axios from "axios";
import WalkerCard from "./WalkerCard.jsx";
import { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";


const SelectWalkers = (props) => {


  const api = process.env.NEXT_PUBLIC_APIURL

  const [walkers, setWalkers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogCapacityFilter, setDogCapacityFilter] = useState("");
  const [walkDurationFilter, setWalkDurationFilter] = useState("");
  const [dogSizeFilter, setDogSizeFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const cardsPerPage = 4;
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = currentPage * cardsPerPage;
  const userProvince = props.userProvince;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${api}/walker/available`
        );
        setWalkers(response.data.walkers);
      } catch (error) {
        console.error("Error fetching walkers:", error);
      }
    };
    fetchData();
  
  }, []);

  console.log(walkers);

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

    const dogSizeFilterCondition =
      !dogSizeFilter ||
      (dogSizeFilter === "small" && walker.walker.dog_size.includes("small")) ||
      (dogSizeFilter === "medium" &&
        walker.walker.dog_size.includes("medium")) ||
      (dogSizeFilter === "large" && walker.walker.dog_size.includes("large"));

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
      dogSizeFilterCondition &&
      searchFilterCondition &&
      walker.province === userProvince
    );
  });

  const renderList = filteredWalkers
    .slice(startIndex, endIndex)
    .map((walker) => (
        <WalkerCard
          key={walker.id}
          name={walker.name}
          lastName={walker.lastName}
          address={walker.address}
          image={walker.image}
          dogCapacity={walker.walker.dog_capacity}
          walkDuration={walker.walker.walk_duration}
          dogSize={walker.walker.dog_size}
        />
    ));

  const containerStyle = {
    textAlign: "center",
    margin: "20px",
  };

  const titleStyle = {
    fontSize: "2em",
    marginBottom: "16px",
  };

  const paginationStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  };

  const paginationButtonStyle = {
    backgroundColor: "black",
    color: "white",
    padding: "10px 15px",
    margin: "0 5px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const pageIndicatorStyle = {
    fontSize: "1.2em",
    margin: "0 10px",
  };

  const noWalkersMessageStyle = {
    fontSize: "1.5em",
    marginTop: "20px",
  };

  return userProvince ? (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Select a Walker from {props.userProvince}</h1>
      <input
        type="text"
        placeholder="Search by name or last name"
        value={searchFilter}
        onChange={handleSearchFilterChange}
        className="border p-2 rounded mr-2 mb-7"
      />
      <div className="mb-8">
        <select
          className="border p-2 rounded mr-2"
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
          className="border p-2 rounded mr-2"
          value={walkDurationFilter}
          onChange={handleWalkDurationFilterChange}
        >
          <option value="">filter by walk duration </option>
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
          <option value="60">60 minutes</option>
        </select>
        <select
          className="border p-2 rounded mr-2"
          value={dogSizeFilter}
          onChange={handleDogSizeFilterChange}
        >
          <option value="">filter by dog size</option>
          <option value="small">small dogs</option>
          <option value="medium">medium dogs</option>
          <option value="large">large dogs</option>
        </select>
        <button onClick={handleRefresh} style={paginationButtonStyle}>
          Refresh
        </button>
      </div>
      {renderList.length > 0 ? (
        renderList
      ) : (
        <p style={noWalkersMessageStyle}>No walkers found.</p>
      )}
      <div className="mb-8" style={paginationStyle}>
        <button onClick={handlePreviousPage} style={paginationButtonStyle}>
          ←
        </button>
        <span style={pageIndicatorStyle}>{`${currentPage}`}</span>
        <button onClick={handleNextPage} style={paginationButtonStyle}>
          →
        </button>
      </div>
    </div>
  ) : null;
};

export default SelectWalkers;
