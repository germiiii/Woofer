"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const WalkList = (props) => {
  const [walks, setWalks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [walksPerPage] = useState(5);
  const [refresh, setRefresh] = useState(false);
  console.log(walks);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const API = process.env.NEXT_PUBLIC_APIURL;
        const response = await axios.get(
          `${API}/walk/walker/b350ed72-e9a9-446a-9d92-0951e87b08c0`
        );
        const walkss = response.data.walksFromWalker;
        const sortedWalks = walkss.sort(
          (a, b) => new Date(b.startTime) - new Date(a.startTime)
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
  const totalPricesSum = currentWalks.reduce(
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
    <div
      className=" mt-10"
      style={{
        border: "2px solid #000",
        padding: "10px",
        overflowX: "auto",
      }}
    >
      <button onClick={handleRefresh} style={{ margin: "10px" }}>
        Refresh
      </button>
      <h2>Walk List</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ padding: "10px", border: "1px solid #000" }}>Date</th>
            <th style={{ padding: "10px", border: "1px solid #000" }}>Name</th>
            <th style={{ padding: "10px", border: "1px solid #000" }}>
              Dog Number
            </th>
            <th style={{ padding: "10px", border: "1px solid #000" }}>
              Total Price
            </th>
            <th style={{ padding: "10px", border: "1px solid #000" }}>
              Status
            </th>
            <th style={{ padding: "10px", border: "1px solid #000" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {currentWalks.map((walk) => (
            <tr key={walk.id}>
              <td style={{ padding: "10px", border: "1px solid #000" }}>
                {" "}
                {formatDate(walk.date)}
              </td>
              <td style={{ padding: "10px", border: "1px solid #000" }}>
                {walk.owner.name}
              </td>
              <td style={{ padding: "10px", border: "1px solid #000" }}>
                {walk.dogNumber}
              </td>
              <td style={{ padding: "10px", border: "1px solid #000" }}>
                $ {walk.totalPrice}
              </td>
              <td style={{ padding: "10px", border: "1px solid #000" }}>
                {walk.state}
              </td>
              <td style={{ padding: "10px", border: "1px solid #000" }}>
                {walk.state === "Pending" && (
                  <div>
                    <button
                      onClick={() => handleStatusChange(walk.id, "In progress")}
                    >
                      In Progress
                    </button>
                    <br />
                    <button
                      onClick={() => handleStatusChange(walk.id, "Rejected")}
                    >
                      Rejected
                    </button>
                  </div>
                )}
                {walk.state === "In progress" && (
                  <button onClick={() => handleStatusChange(walk.id, "Done")}>
                    Done
                  </button>
                )}
                {!walk.action ? "Non Action" : walk.action}
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
            <a onClick={() => paginate(number)}>{number}</a>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <h3>Total Price Sum: $ {totalPricesSum.toFixed(2)}</h3>
      </div>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <h3>Total Walks: {walks.length}</h3>
      </div>
    </div>
  );
};

export default WalkList;
