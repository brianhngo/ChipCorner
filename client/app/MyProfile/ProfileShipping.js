import React, {useState, useEffect} from 'react'

export default function ProfileBilling() {
   const [address, setAddress] = useState("");
   const [zipcode, setZipcode] = useState("");
   const [city, setCity] = useState("");
   const [state, setState] = useState("");
   const [country, setCountry] = useState("");

    const addressHandler = (event) => {
        console.log(address)
        setAddress(event.target.value)
    }

     const zipcodeHandler = (event) => {
        console.log(zipcode)
        setZipcode(event.target.value)
    }

     const cityHandler = (event) => {
        console.log(city)
        setCity(event.target.value)
    }

     const stateHandler = (event) => {
        console.log(state)
        setState(event.target.value)
    }

     const countryHandler = (event) => {
        console.log(country)
        setCountry(event.target.value)
    }

     const onClickHandler = (event) => {
        console.log('hi')
    }


  return (
    <section className = 'profileContainer'>
          <h1> Shipping Information </h1> 

        

         <div className='group'>
          <input type = 'text' id='address' name='address' value = {address} onChange = {addressHandler} required/>
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>Name</label>
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



   
 



