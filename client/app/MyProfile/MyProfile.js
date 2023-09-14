import React from 'react'

export default function MyProfile() {
  return (
    <>
    <h1 className="user-info">User Information</h1>
    <div className = 'user-container'>
      <div className="user-section">Contact Information</div>
      <div className="user-section">Billing Information</div>
      <div className="user-section">Shipping Information</div>
      <div className="user-list">Bookmarked Items / Save for Later</div>
      <div className="user-list">Past Orders</div>
    </div>
    </>
  )
}
