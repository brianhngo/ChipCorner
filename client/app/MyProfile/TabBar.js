import React from 'react'

export default function TabBar({active , changeState}) {

  return (
     <nav className = 'user-container'>
      <div  className={`user-section ${active === 'contact' ? 'active' : ''}`}  onClick={() => changeState('contact')}>Contact Information</div>
      <div  className={`user-section ${active === 'billing' ? 'active' : ''}`} onClick = {() => changeState('billing')}>Billing Information</div>
      <div  className={`user-section ${active === 'shipping' ? 'active' : ''}`} onClick = {() => changeState('shipping')}>Shipping Information</div>
      <div  className={`user-section ${active === 'bookmarks' ? 'active' : ''}`}  onClick = {() => changeState('bookmarks')}>Bookmarked Items / Save for Later</div>
      <div  className={`user-section ${active === 'pastorders' ? 'active' : ''}`}  onClick = {() => changeState('pastorders')}>Past Orders</div>
    </nav>
  )

}
