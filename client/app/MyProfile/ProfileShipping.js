import React, {useState, useEffect} from 'react'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {updateProfile2, getUpdateProfileData} from './ProfileSlice.js';

export default function ProfileBilling() {
  const dispatch = useDispatch()
  const userProfileData = useSelector( (state) =>  state.profile.storage.information)
   const [address, setAddress] = useState("");
   const [zipcode, setZipcode] = useState("");
   const [city, setCity] = useState("");
   const [state, setState] = useState("");
   const [country, setCountry] = useState("");

    const addressHandler = (event) => {
        setAddress(event.target.value)
    }

     const zipcodeHandler = (event) => {
        setZipcode(event.target.value)
    }

     const cityHandler = (event) => {
        setCity(event.target.value)
    }

     const stateHandler = (event) => {
        setState(event.target.value)
    }

     const countryHandler = (event) => {
        setCountry(event.target.value)
    }

     const onClickHandler = (event) => {
       toast.success('Saved')
       dispatch(updateProfile2({
          address : `${address}`,
          zipcode : `${zipcode}`,
          city : `${city}`,
          state : `${state}`,
          country : `${country}`,
          token :window.localStorage.getItem('token') || "",
        }))
    }

    useEffect(() => {
 
    if (userProfileData) {
      setAddress(userProfileData.address || '');
      setZipcode(userProfileData.zipcode || '');
      setCity(userProfileData.city || '');
      setState(userProfileData.state || '');
      setCountry(userProfileData.country || '');
    }
  }, [userProfileData]); 

  useEffect( () => {
    const token = window.localStorage.getItem('token')
    const getProfileData = async (token) => {
      dispatch(getUpdateProfileData({
        token:token
      }))
    }
    getProfileData(token)
  }, [])


  return (
    <section className = 'profileContainer'>
          <h1> Shipping Information </h1> 

        

         <div className='group'>
          <input type = 'text' id='address' name='address' value = {address} onChange = {addressHandler} required/>
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>Address</label>
        </div>

        <div className='group'>
          <input type = 'text' id='zipcode' name='zipcode' value = {zipcode} onChange ={zipcodeHandler} required/>
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>Zipcode</label>
        </div>

        <div className='group'>
          <input type = 'text' id='city' name='city' value = {city} onChange = {cityHandler} required/>
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>City</label>
        </div>

        <div className='group'>
         
          <input type = 'text' id='state' name='state' value = {state} onChange = {stateHandler} required/>
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>State/Region</label>
        </div>

        <div className='group'>
          <input type='text' id='country' name='country' value = {country} onChange = {countryHandler} required />
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>Country</label>
        </div>

        <button className = 'saveButton' onClick = {onClickHandler}> Save </button>
    </section>
  )
}



   
 



