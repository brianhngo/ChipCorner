import React from 'react';

export default function AdminTabBar({ active, changeState }) {
  return (
    <nav className="user-container">
      <div
        className={`user-section ${active === 'allchips' ? 'active' : ''}`}
        onClick={() => changeState('allchips')}>
        All Products
      </div>
      <div
        className={`user-section ${active === 'allorders' ? 'active' : ''}`}
        onClick={() => changeState('allorders')}>
        All Orders
      </div>
      <div
        className={`user-section ${active === 'allusers' ? 'active' : ''}`}
        onClick={() => changeState('allusers')}>
        All Users
      </div>
    </nav>
  );
}
