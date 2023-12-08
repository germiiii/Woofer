"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import PayPal from '../Components/PayPal'
import Image from "next/image";

const CheckoutComponent = () => {
  
  const [walkerDetails, setWalkerDetails] = useState(null);
  const [selectedWalkType, setSelectedWalkType] = useState(null);
  const [extras, setExtras] = useState([]);
  const [walkTypeQuantity, setWalkTypeQuantity] = useState(1);
  const [extraQuantities, setExtraQuantities] = useState({
    Leash: 0,
    GarbageBag: 0,
    WaterBowl: 0,
  });

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
    const selectedType = walkerData.walker.walkTypes.find(
      (walkType) => walkType.title === walkTypeTitle
    );
    setSelectedWalkType(selectedType);
    console.log('Selected Walk:', selectedType)
  };

  const handleExtrasSelection = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setExtras([...extras, value]);
    } else {
      setExtras(extras.filter((extra) => extra !== value));
    }
  };

  const handleQuantityChange = (e, item) => {
    let value = parseInt(e.target.value);

    // Validate and limit the value between 0 and 15
    value = Math.min(Math.max(value, 0), 15);

    setExtraQuantities({ ...extraQuantities, [item]: value });
  };

  const calculateTotalAmount = () => {
    let walkTypePrice = 0;
    if (selectedWalkType) {
      // Use the selectedWalkType object directly to calculate price
      walkTypePrice = selectedWalkType.price * walkTypeQuantity;
    }

    let extrasTotal = 0;
    for (const extra in extraQuantities) {
      const extraPrice = {
        Leash: 5,
        GarbageBag: 2,
        WaterBowl: 3,
        // Add more extras with their corresponding prices
      }[extra];
      if (extraPrice) {
        extrasTotal += extraPrice * extraQuantities[extra];
      }
    }

    return walkTypePrice + extrasTotal;
  };

  const totalAmount = calculateTotalAmount();

   return (
    <div className="flex">
      <div className="w-1/2 pr-8">
        <h2 className="mb-4">Walker Details</h2>
        {walkerDetails && walkerData ? (
          <div>
            <p>{walkerData.name + " " + walkerData.lastName}</p>
            <Image 
            src={walkerData.image}
            alt='profile'
            width={500}
            height={500}
            />
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
             {/* Walk Type Quantity */}
             <div className="mt-4">
              <label htmlFor="walkTypeQuantity">Quantity for Walk Type:</label>
              <input
                type="number"
                id="walkTypeQuantity"
                value={walkTypeQuantity}
                onChange={(e) => setWalkTypeQuantity(parseInt(e.target.value))}
                className="border p-1 rounded"
              />
            </div>
             {/* Add Extras Section */}
             <div className="mt-8">
              <h3 className="mb-4">Add Extras:</h3>
              <div>
              <label htmlFor="waterBowl">
    Leash - $5
  </label>
  <span>
   
    <input
      type="number"
      value={extraQuantities['Leash']}
      onChange={(e) => handleQuantityChange(e, 'Leash')}
      className="border p-1 rounded ml-2 w-12"
      min="0"
      max="15"
    />
  </span>
</div>
              
            
  <label htmlFor="waterBowl">
    Garbage Bag - $2
  </label>
  <span>
   
    <input
      type="number"
      value={extraQuantities['Garbage Bag']}
      onChange={(e) => handleQuantityChange(e, 'Garbage Bag')}
      className="border p-1 rounded ml-2 w-12"
      min="0"
      max="15"
    />
  </span>
</div>
  <label htmlFor="waterBowl">
    Water Bowl - $3
  </label>
  <span>
   
    <input
      type="number"
      value={extraQuantities['Water Bowl']}
      onChange={(e) => handleQuantityChange(e, 'Water Bowl')}
      className="border p-1 rounded ml-2 w-12"
      min="0"
      max="15"
    />
  </span>
</div>
           
         
        ) : (
          <p>Loading walker details...</p>
        )}
      </div>
      <div>
        <h1>Summary</h1>
        <h2>Total: ${totalAmount}</h2>
      </div>
      <div>
      <PayPal totalAmount={totalAmount} />
      </div>
      
     
    </div>
  );
  
};

export default CheckoutComponent;








