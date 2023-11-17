import WalkerCard from "./WalkerCard";
import { useState } from "react";
import "tailwindcss/tailwind.css";

export default function SelectWalkers() {
  const walker1 =
    "https://media.licdn.com/dms/image/D4D03AQEfzyneqdEzLg/profile-displayphoto-shrink_800_800/0/1665425697970?e=2147483647&v=beta&t=WoUnEAdkV5redn5-Zx4rqayYduHxE647VhCZ6tIAzL8";
  const walker2 =
    "https://i.scdn.co/image/ab6761610000517420445c2cc9d93a550e1488b0";
  const walkersMock = [
    {
      id: 1,
      name: "Lucas",
      lastName: "Zibaitis",
      address: "Sarachaga 4632",
      image: walker1,
    },
    {
      id: 2,
      name: "German",
      lastName: "Torres",
      address: "Aranguren 1020",
      image: walker1,
    },
    {
      id: 3,
      name: "Victoria",
      lastName: "Correas",
      address: "Juan B. Justo 302",
      image: walker2,
    },
    {
      id: 4,
      name: "Alice",
      lastName: "Johnson",
      address: "Maple Street 123",
      image: walker2,
    },
    {
      id: 5,
      name: "John",
      lastName: "Smith",
      address: "Oak Avenue 456",
      image: walker1,
    },
    {
      id: 6,
      name: "Emma",
      lastName: "Williams",
      address: "Pine Road 789",
      image: walker2,
    },
    {
      id: 7,
      name: "Daniel",
      lastName: "Miller",
      address: "Cedar Lane 567",
      image: walker1,
    },
    {
      id: 8,
      name: "Olivia",
      lastName: "Brown",
      address: "Birch Court 890",
      image: walker1,
    },
    {
      id: 9,
      name: "Michael",
      lastName: "Davis",
      address: "Elm Place 234",
      image: walker2,
    },
    {
      id: 10,
      name: "Sophia",
      lastName: "Jackson",
      address: "Spruce Drive 567",
      image: walker2,
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
        image={walker.image}
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
      <div className="mb-8">
        <select className="border p-2 rounded mr-2">
          <option value="">filter by dog capacity</option>
          <option value="1">one dog</option>
          <option value="<3">less than three dogs</option>
          <option value="<5">less than five dogs</option>
          <option value=">5">more than five dogs</option>
        </select>
        <select className="border p-2 rounded mr-2">
          <option>filter by walk time </option>
        </select>
        <select className="border p-2 rounded mr-2">
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
