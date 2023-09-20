import React, {useState} from 'react'
import TabBar from './TabBar.js'
import ProfileBookmarks from './ProfileBookmarks.js';
import ProfileBilling from './ProfileBilling.js';
import ProfileContact from './ProfileContact.js';
import ProfilePastOrders from './ProfilePastOrders.js';
import ProfileShipping from './ProfileShipping';

export default function MyProfile() {

  const [active, setActive] = useState('contact');

  const onChangeHandler = (event) => {
    setActive(event.target.value)
  }

  return (
    <>
      <h1 className="user-info">Your Profile</h1>
      <TabBar   active = {active} changeState = {setActive}/>
      {active === 'contact' ? (<ProfileContact/>) : null}
      {active === 'shipping' ? (<ProfileShipping/>) : null}
      {active === 'bookmarks' ? (<ProfileBookmarks/>) : null}
      {active === 'pastorders' ? (<ProfilePastOrders/>) : null}
    </>
  )
}
