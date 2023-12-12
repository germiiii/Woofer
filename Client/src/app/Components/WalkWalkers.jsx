import React, { useState, useEffect } from 'react';
import axios from 'axios';


const WalkList = (props) => {
  const [walks, setWalks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [walksPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API = process.env.NEXT_PUBLIC_APIURL;
        const response = await axios.get(`${API}/walk/walker/${props.userId}`);
        setWalks(response.data.walksFromWalker[0].walker.walks);

      } catch (error) {
        console.error('Error al obtener los datos de la caminata:', error);
      }
    };

    // Llamar a fetchData inmediatamente
    fetchData();

   const intervalId = setInterval(fetchData, 30000);

    return () => clearInterval(intervalId);
  }, [props.userId]);

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
      console.error('Error al cambiar el estado de la caminata:', error);
    }
  };

  const indexOfLastWalk = currentPage * walksPerPage;
  const indexOfFirstWalk = indexOfLastWalk - walksPerPage;
  const currentWalks = walks.slice(indexOfFirstWalk, indexOfLastWalk);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ border: '1px solid #000', padding: '10px', borderRadius: '5px', overflowX: 'auto' }}>
      <h2>Lista de Caminatas</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', border: '1px solid #000' }}>Date</th>
            <th style={{ padding: '10px', border: '1px solid #000' }}>StartTime</th>
            <th style={{ padding: '10px', border: '1px solid #000' }}>DogNumber</th>
            <th style={{ padding: '10px', border: '1px solid #000' }}>TotalPrice</th>
            <th style={{ padding: '10px', border: '1px solid #000' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentWalks.map((walk) => (
            <tr key={walk.id}>
              <td style={{ padding: '10px', border: '1px solid #000' }}>{walk.date}</td>
              <td style={{ padding: '10px', border: '1px solid #000' }}>{walk.startTime}</td>
              <td style={{ padding: '10px', border: '1px solid #000' }}>{walk.dogNumber}</td>
              <td style={{ padding: '10px', border: '1px solid #000' }}>{walk.totalPrice}</td>
              <td style={{ padding: '10px', border: '1px solid #000' }}>
                <div
                  style={{
                    backgroundColor: walk.state === 'pending' ? 'lightgray' : '',
                    borderRadius: '5px',
                    padding: '5px',
                  }}
                  onClick={() => {
                    if (walk.state === 'pending') {
                      handleStatusChange(walk.id, 'in progress');
                    }
                  }}
                >
                  {walk.state}

                  {walk.state === 'pending' && (
                    <div>
                      <button
                        onClick={() => handleStatusChange(walk.id, 'in progress')}
                        style={{ color: 'green', margin: '0 5px' }}
                      >
                        In Progress
                      </button>
                      <button
                        onClick={() => handleStatusChange(walk.id, 'rejected')}
                        style={{ color: 'red', margin: '0 5px' }}
                      >
                        Rejected
                      </button>
                    </div>
                  )}
                  {walk.state === 'in progress' && (
                    <button
                      onClick={() => handleStatusChange(walk.id, 'done')}
                      style={{ color: 'skyblue', margin: '0 5px' }}
                    >
                      Done
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        {Array.from({ length: Math.ceil(walks.length / walksPerPage) }, (_, i) => i + 1).map((number) => (
          <li key={number} style={{ margin: '0 5px', cursor: 'pointer' }}>
            <a onClick={() => paginate(number)}>{number}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WalkList;
