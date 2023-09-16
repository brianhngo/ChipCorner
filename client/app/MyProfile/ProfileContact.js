import React, {useState, useEffect} from 'react'

export default function ProfileContact() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const firstNameHandler = (event) => {
        console.log(firstName)
        setFirstName(event.target.value)
    }

      const lastNameHandler = (event) => {
        console.log(lastName)
        setLastName(event.target.value)
    }

      const emailHandler = (event) => {
        console.log(email)
        setEmail(event.target.value)
    }

      const phoneNumberHandler = (event) => {
        console.log(phoneNumber)
        setPhoneNumber(event.target.value)
    }

    const onClickHandler = (event) => {
        console.log('hi')
    }

  


  return (
    <section className = 'profileContainer'>
        <h1> Personal Information </h1> 

         <div className='group'>
          <input type='text' id='firstname' name='firstname' value = {firstName} onChange= {firstNameHandler} required />
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>Name</label>
        </div>

        <div className='group'>
          <input type='text' id='firstname' name='firstname' value = {lastName} onChange = {lastNameHandler} required />
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>Last Name</label>
        </div>

        <div className='group'>
          <input type='email' id='email' name='email' value = {email} onChange = {emailHandler} required />
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>Email</label>
        </div>

        <div className='group'>
          <input type='tel' id='phone' name='phone' value = {phoneNumber} onChange = {phoneNumberHandler}required />
           <span class="highlight"></span>
          <span class="bar"></span>
          <label>Phone Number  EX/ Format: 1234567890</label>
        </div>

        <button className = 'saveButton' onClick = {onClickHandler}> Save </button>
    </section>
  )
}
