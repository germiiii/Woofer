import WalkerCard from "./WalkerCard";
import { useState } from "react";

export default function SelectWalkers() {
  const walkersMock = [
    { id: 1, name: "Lucas", lastName: "Zibaitis", address: "Sarachaga 4632" },
    { id: 2, name: "German", lastName: "Torres", address: "Aranguren 1020" },
    {
      id: 3,
      name: "Victoria",
      lastName: "Correas",
      address: "Juan B. Justo 302",
    },
    { id: 4, name: "Alice", lastName: "Johnson", address: "Maple Street 123" },
    { id: 5, name: "John", lastName: "Smith", address: "Oak Avenue 456" },
    { id: 6, name: "Emma", lastName: "Williams", address: "Pine Road 789" },
    { id: 7, name: "Daniel", lastName: "Miller", address: "Cedar Lane 567" },
    { id: 8, name: "Olivia", lastName: "Brown", address: "Birch Court 890" },
    { id: 9, name: "Michael", lastName: "Davis", address: "Elm Place 234" },
    {
      id: 10,
      name: "Sophia",
      lastName: "Jackson",
      address: "Spruce Drive 567",
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 5;
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = currentPage * cardsPerPage;

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const maxPage = Math.ceil(walkersMock.length / cardsPerPage);
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderList = walkersMock
    .slice(startIndex, endIndex)
    .map((walker) => (
      <WalkerCard
        key={walker.id}
        name={walker.name}
        lastName={walker.lastName}
        address={walker.address}
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

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Select a Walker</h1>
      <div>
        <select>
          <option>filter by dog capacity</option>
        </select>
        <select>
          <option>filter by walk time </option>
        </select>
        <select>
          <option>filter by service type</option>
        </select>
      </div>
      {renderList}
      <div>
        <button onClick={handlePreviousPage}>Previous</button>
        <span>{`Page ${currentPage}`}</span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
}
