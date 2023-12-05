"use client"
import { useParams, useRouter } from 'next/navigation';
import WalkServiceDetail from '../../Components/WalkServiceDetail';
import { useState, useEffect } from 'react';
import Loader  from '../../Components/Loader';
import axios from 'axios'; // Import axios or other necessary modules

const ServiceDetail = () => {
  
  const { id } = useParams()
  const [service, setService] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = process.env.NEXT_PUBLIC_APIURL;
        const response = await axios.get(`${api}/walkType/${id}`); 
        setService(response.data);
      } catch (error) {
        console.error('Error fetching service details:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!service) {
    return (
      <div>
        <Loader/>
      </div>
    )
  }

  const { title, price, description } = service;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
   
    </div>
  );
};

export default ServiceDetail;
