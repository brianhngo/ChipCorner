import React, { useState } from 'react';
import AdminTabBar from './AdminTabBar.js';
import AllProducts from './AllProducts.js';
import AllOrders from './AllOrders.js';
import AllUsers from './AllUsers.js';

export default function MyProfile() {
  const [active, setActive] = useState('allchips');

  const onChangeHandler = (event) => {
    setActive(event.target.value);
  };

  return (
    <>
      <h1 className="user-info"> Admin </h1>
      <AdminTabBar active={active} changeState={setActive} />
      {active === 'allchips' ? <AllProducts /> : null}
      {active === 'allorders' ? <AllOrders /> : null}
      {active === 'allusers' ? <AllUsers /> : null}
    </>
  );
}
