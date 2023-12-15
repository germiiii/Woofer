"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const WalkList = (props) => {
  const [walks, setWalks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [walksPerPage] = useState(6);
  const [refresh, setRefresh] = useState(false);
  console.log(walks);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const API = process.env.NEXT_PUBLIC_APIURL;
        const response = await axios.get(`${API}/walk/walker/${props.userId}`);
        const walkss = response.data.walksFromWalker;
        const sortedWalks = walkss.sort(
          (a, b) => new Date(a.startTime) - new Date(b.startTime)
        );
        setWalks(sortedWalks);
      } catch (error) {
        console.error("Error al obtener los datos de la caminata:", error);
      }
    };

    fetchData();
    setRefresh(false);
  }, [props.userId, refresh]);

  const handleStatusChange = async (walkId, newStatus) => {
    try {
      const API = process.env.NEXT_PUBLIC_APIURL;
      await axios.put(`${API}/walk/${walkId}`, { state: newStatus });
      setWalks((prevWalks) =>
        prevWalks.map((walk) =>
          walk.id === walkId ? { ...walk, state: newStatus } : walk
        )
      );
    } catch (error) {
      console.error("Error al cambiar el estado de la caminata:", error);
    }
  };

  const currentWalks =
    walks && walks.length > 0
      ? walks.slice(
          (currentPage - 1) * walksPerPage,
          currentPage * walksPerPage
        )
      : [];

  const totalPricesSum = walks.reduce(
    (sum, walk) => sum + parseFloat(walk.totalPrice),
    0
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleRefresh = () => setRefresh(true);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  return (
    <div className="w-[900px] mt-6">
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th
              style={{
                padding: "10px",
                border: "2px solid #F39200",
                width: "100px",
              }}
              className="text-[#F39200]"
            >
              Date
            </th>
            <th
              style={{
                padding: "10px",
                border: "2px solid #F39200",
                width: "200px",
              }}
              className="text-[#F39200]"
            >
              Name
            </th>
            <th
              style={{
                padding: "10px",
                border: "2px solid #F39200",
                width: "100px",
              }}
              className="text-[#F39200]"
            >
              Total Dogs
            </th>
            <th
              style={{
                padding: "10px",
                border: "2px solid #F39200",
                width: "100px",
              }}
              className="text-[#F39200]"
            >
              Price
            </th>
            <th
              style={{
                padding: "10px",
                border: "2px solid #F39200",
                width: "120px",
              }}
              className="text-[#F39200]"
            >
              Status
            </th>
            <th
              style={{ padding: "10px", border: "2px solid #F39200" }}
              className="text-[#F39200]"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {currentWalks.map((walk) => (
            <tr key={walk.id}>
              <td
                style={{
                  padding: "10px",
                  border: "2px solid #F39200",
                  height: "70px",
                }}
                className="text-white"
              >
                {" "}
                {formatDate(walk.date)}
              </td>
              <td
                style={{ padding: "10px", border: "2px solid #F39200" }}
                className="text-white"
              >
                {walk.owner.name}
              </td>
              <td
                style={{ padding: "10px", border: "2px solid #F39200" }}
                className="text-white text-center"
              >
                {walk.dogNumber}
              </td>
              <td
                style={{ padding: "10px", border: "2px solid #F39200" }}
                className="text-white text-end"
              >
                $ {walk.totalPrice}
              </td>
              <td
                style={{
                  padding: "10px",
                  border: "2px solid #F39200",
                  color:
                    walk.state === "In progress"
                      ? "yellow"
                      : walk.state === "Rejected"
                      ? "red"
                      : walk.state === "Done"
                      ? "#8AFF8A"
                      : "", // Puedes establecer un color predeterminado o dejarlo vacío según tus necesidades
                }}
                className="text-white text-center"
              >
                {walk.state}
              </td>
              <td style={{ padding: "10px", border: "2px solid #F39200" }}>
                {walk.state === "Pending" && (
                  <div className="flex flex-col justify-center">
                    <button
                      onClick={() => handleStatusChange(walk.id, "In progress")}
                      className="px-6 py-1 rounded-full bg-[#4CAF50] text-white font-bold hover:bg-green-700 transition-all duration-300 ease-in-out"
                    >
                      {" "}
                      start
                    </button>
                    <button
                      onClick={() => handleStatusChange(walk.id, "Rejected")}
                      className="px-6 py-1 mt-2 rounded-full bg-red-500 text-white font-bold hover:bg-red-700 transform transition-all duration-300 ease-in-out"
                    >
                      reject
                    </button>
                  </div>
                )}
                {walk.state === "In progress" && (
                  <div className="flex flex-col justify-center">
                    <button
                      onClick={() => handleStatusChange(walk.id, "Done")}
                      className="px-6 py-1 rounded-full bg-[#E4E2ED] text-[#29235c] font-bold hover:bg-gray-300 transition-all duration-300 ease-in-out"
                    >
                      finish
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul
        style={{
          listStyleType: "none",
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        {Array.from(
          { length: Math.ceil(walks.length / walksPerPage) },
          (_, i) => i + 1
        ).map((number) => (
          <li key={number} style={{ margin: "0 5px", cursor: "pointer" }}>
            <a
              onClick={() => paginate(number)}
              className="font-bold"
              style={{
                color: number === currentPage ? "#F39200" : "white",
                textDecoration: "none",
              }}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex justify-around items-center mt-10">
        <div className="flex flex-col text-center">
          <h3 className="text-white">Total Walks: </h3>
          <h3 className="font-bold text-[#F39200]">{walks.length}</h3>
        </div>
        <div className="flex flex-col text-center">
          <h3 className="text-white">Total Price: </h3>
          <h3 className="font-bold text-[#F39200]">
            $ {totalPricesSum.toFixed(2)}
          </h3>
        </div>
        <div>
          <button
            onClick={handleRefresh}
            className="px-6 py-1 rounded-full bg-[#F39200] text-white font-bold mr-10 hover:text-[#29235c] transition transition-colors duration-300"
          >
            refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalkList;
