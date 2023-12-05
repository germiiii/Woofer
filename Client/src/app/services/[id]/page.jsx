"use client"
import React from 'react';
import axios from 'axios';
import WalkServiceDetail from '../../Components/WalkServiceDetail'

const ServiceDetail = ({ service }) => {
  if (!service) {
    return <div>Loading...</div>; // Handle loading state or error state
  }

  return <WalkServiceDetail {...service} />;
};

ServiceDetail.getInitialProps = async ({ query }) => {
  try {
    const { id } = query;
    const { data } = await axios.get(`http://localhost:3001/walkType/${id}`);
    const service = data; // Assuming data contains details of the specific service

    return { service };
  } catch (error) {
    console.error('Error fetching service details:', error);
    return { service: null }; // Or handle error state
  }
};

export default ServiceDetail;