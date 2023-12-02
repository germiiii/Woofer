
import React from 'react';
import NavBarHome from '../Components/NavBarHome'
import UserDetail from '../Components/UserDetail'
import PayPal from '../Components/PayPal'
// import MercadoPago from '../Components/MercadoPago'


const CheckoutPage = () => {
  // return (
  //   <div>
  //     <NavBarHome />
  //     <MercadoPago />
  //   </div>
  // );

  return (
    <div>
      <NavBarHome/>
    <div>
      <UserDetail/>
    </div>
       <div>
        <PayPal/>
       </div>
   
  </div>
  )
};

export default CheckoutPage;