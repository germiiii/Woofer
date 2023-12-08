"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import PayPal from '../Components/PayPal'

const CheckoutComponent = () => {
  
  const [walkerDetails, setWalkerDetails] = useState(null);
  const [selectedWalkType, setSelectedWalkType] = useState(null);

  useEffect(() => {
    const selectedWalker = localStorage.getItem('selectedWalker');
    //console.log('Selected Walker:', selectedWalker)
    if (selectedWalker) {
      const parsedWalker = JSON.parse(selectedWalker);
      setWalkerDetails(parsedWalker);
    }
  }, []);

  const walkerData = walkerDetails?.walker?.walkerData || {};

  const handleWalkTypeSelection = (walkTypeTitle) => {
    // Find the selected walkType object based on the title
    const selectedType = walkerDetails?.walker?.walker?.walkTypes.find(
      (walkType) => walkType.title === walkTypeTitle
    );
    setSelectedWalkType(selectedType);
  };

  return (
    <div className="flex">
      <div className="w-1/2 pr-8">
        <h2 className="mb-4">Walker Details</h2>
        {walkerDetails && walkerData ? (
          <div>
            <p>{walkerData.name + " " + walkerData.lastName}</p>
          </div>
        ) : (
          <p>Loading walker details...</p>
        )}
      </div>
      <div className="w-1/2 pl-8">
        {walkerDetails && walkerData ? (
          <div>
            <h3 className="mb-4">Walk Services by {walkerData.name}:</h3>
            {walkerData.walker?.walkTypes && walkerData.walker.walkTypes.length > 0 ? (
              <div>
                <label htmlFor="walkTypeSelect">Select Walk Type:</label>
                <select
                  id="walkTypeSelect"
                  onChange={(e) => handleWalkTypeSelection(e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="">Select a Walk Type</option>
                  {walkerData.walker.walkTypes.map((walkType) => (
                    <option key={walkType.id} value={walkType.title}>
                      {walkType.title} - ${walkType.price}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <p>No walk types available</p>
            )}
          </div>
        ) : (
          <p>Loading walker details...</p>
        )}
      </div>
      <PayPal selectedWalkType={selectedWalkType} />
    </div>
  );
  
};

export default CheckoutComponent;








