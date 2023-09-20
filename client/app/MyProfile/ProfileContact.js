import React, {useState, useEffect} from 'react'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {updateProfile, getUpdateProfileData} from './ProfileSlice.js';

export default function ProfileContact() {
    const userProfileData = useSelector( (state) =>  state.profile.storage.information)
    const dispatch = useDispatch();
   const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
   
    const firstNameHandler = (event) => {
        setFirstName(event.target.value)
    }

      const lastNameHandler = (event) => {
        setLastName(event.target.value)
    }

  

      const phoneNumberHandler = (event) => {
        setPhoneNumber(event.target.value)
    }

    const onClickHandler = (event) => {
        toast.success('Saved')
        dispatch(updateProfile({
          firstname : `${firstName}`,
          lastname : `${lastName}`,
          phone : `${phoneNumber}`,
          token :window.localStorage.getItem('token') || "",
        }))
    }

   useEffect(() => {
 
    if (userProfileData) {
      setFirstName(userProfileData.firstname || '');
      setLastName(userProfileData.lastname || '');
      setPhoneNumber(userProfileData.phone || '');
    }
  }, [userProfileData]); 

  useEffect( () => {
    const token = window.localStorage.getItem('token') || "";
    const getProfileData = async (token) => {
      dispatch(getUpdateProfileData({
        token:token
      }))
    }
    getProfileData(token)
  }, [])


  return (
    <section className = 'profileContainer'>
        <h1> Personal Information </h1> 
         <div className='group'>
          <input type='text' id='firstname' name='firstname' value = {firstName} onChange= {firstNameHandler} required />
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>First Name</label>
        </div>

        <div className='group'>
          <input type='text' id='firstname' name='firstname' value = {lastName} onChange = {lastNameHandler} required />
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>Last Name</label>
        </div>

        <div className='group'>
          <input type='text' id='phone' name='phone' value = {phoneNumber} onChange = {phoneNumberHandler}required />
           <span class="highlight"></span>
          <span class="bar"></span>
          <label>Phone Number Format: 123-456-7890</label>
        </div>

        <button className = 'saveButton' onClick = {onClickHandler}> Save </button>
    </section>
  )
}
