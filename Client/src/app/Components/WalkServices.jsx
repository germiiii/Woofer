"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import WalkServiceDetail from '../Components/WalkServiceDetail'
import "tailwindcss/tailwind.css";

async function getWalkTypes() {

  const api = process.env.NEXT_PUBLIC_APIURL;

  try {
    const response = await axios.get(`${api}/walkType`);
    const data = response.data;
    return data.walkTypeData || [];
  } catch (error) {
    console.error('Error fetching walk types:', error);
    return [];
  }
}

const WalkTypes = () => {
  const [walkTypes, setWalkTypes] = useState([]);

  useEffect(() => {
    async function fetchWalkTypes() {
      try {
        const data = await getWalkTypes();
        setWalkTypes(data);
      } catch (error) {
        console.error('Error fetching walk types:', error);
      }
    }

    fetchWalkTypes();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dog Walk Services</h1>
      {walkTypes.length > 0 ? (
        walkTypes.map(({ id, title, price, description }) => (
          <div className="mb-4" key={id}>
            <Link href={`/services/${id}`}>
              <div>
                <WalkServiceDetail
                  id={id}
                  title={title}
                  price={price}
                  description={description}
                />
              </div>
            </Link>
            <hr className="my-2 border-t border-gray-400" />
          </div>
        ))
      ) : (
        <p>No walk types available</p>
      )}
    </div>
  );
};

export default WalkTypes;