import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import StripeContainer from './StripContainer';
import { getCartData } from '../CartPageSlice';
import { getUpdateProfileData } from '../../MyProfile/ProfileSlice.js';

const CheckoutPage = () => {
  const [showItem, setShowItem] = useState(true);
  const cartData = useSelector((state) => state.order.cartData);
  const userProfileData = useSelector(
    (state) => state.profile.storage.information
  );
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingZipcode, setShippingZipcode] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingState, setShippingState] = useState('');
  const [shippingCountry, setShippingCountry] = useState('');
  const [email, setEmail] = useState('');
  const [useProfileInfo, setUseProfileInfo] = useState(false);
  const [sameAddress, setSameAddress] = useState(true);
  const storageObject = {
    firstname: firstName,
    lastname: lastName,
    phone: phoneNumber,
    address: address,
    zipcode: zipcode,
    city: city,
    state: state,
    country: country,
    useProfileInfo: useProfileInfo,
    sameAddress: sameAddress,
    shippingAddress: shippingAddress,
    shippingZipcode: shippingZipcode,
    shippingCity: shippingCity,
    shippingState: shippingState,
    shippingCountry: shippingCountry,
  };
  console.log(storageObject);
  // Getting the Amount from cart
  // deStringify the JSON stringify
  const grabCartFromStorage =
    JSON.parse(window.localStorage.getItem('cart')) || {};

  // Array of product IDs
  const arrayOfProductId = Object.keys(grabCartFromStorage) || [];
  const arrayOfProductIdInteger = arrayOfProductId.map((element) =>
    parseInt(element)
  );

  // Array of the Object ex/ [ {ProductId#1} : Quantity , {ProductId#2} : Quantity ]
  const arrayOfQuantity = Object.values(grabCartFromStorage) || [];

  useEffect(() => {
    dispatch(getCartData({ arrayOfProductIdInteger }));
  }, []);

  const getTotalAmount = () => {
    let total = 0;
    if (
      cartData &&
      arrayOfQuantity &&
      cartData.length === arrayOfQuantity.length
    ) {
      for (let i = 0; i < cartData.length; i++) {
        total += cartData[i].price * arrayOfQuantity[i];
      }
    }

    // Formatting total to 2 decimal places
    const formattedTotal = total.toFixed(2);
    return formattedTotal;
  };

  const totalAmount = getTotalAmount();

  const firstNameHandler = (event) => {
    setFirstName(event.target.value);
  };

  const lastNameHandler = (event) => {
    setLastName(event.target.value);
  };

  const phoneNumberHandler = (event) => {
    setPhoneNumber(event.target.value);
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const addressHandler = (event) => {
    setAddress(event.target.value);
  };

  const shippingAddressHandler = (event) => {
    setShippingAddress(event.target.value);
  };

  const zipcodeHandler = (event) => {
    setZipcode(event.target.value);
  };

  const shippingZipcodeHandler = (event) => {
    setShippingZipcode(event.target.value);
  };

  const cityHandler = (event) => {
    setCity(event.target.value);
  };

  const shippingCityHandler = (event) => {
    setShippingCity(event.target.value);
  };

  const stateHandler = (event) => {
    setState(event.target.value);
  };

  const shippingStateHandler = (event) => {
    setShippingState(event.target.value);
  };

  const countryHandler = (event) => {
    setCountry(event.target.value);
  };

  const shippingCountryHandler = (event) => {
    setShippingCountry(event.target.value);
  };

  const handleUseProfileInfoChange = () => {
    setUseProfileInfo(!useProfileInfo);
  };

  const handleSameAddressChange = () => {
    setSameAddress(!sameAddress);
  };

  useEffect(() => {
    if (userProfileData && useProfileInfo === true) {
      setFirstName(userProfileData.firstname);
      setLastName(userProfileData.lastname);
      setPhoneNumber(userProfileData.phone);
      setEmail(userProfileData.email);
      setAddress(userProfileData.address);
      setZipcode(userProfileData.zipcode);
      setCity(userProfileData.city);
      setState(userProfileData.state);
      setCountry(userProfileData.country);
    } else {
      setFirstName('');
      setLastName('');
      setPhoneNumber('');
      setEmail('');
      setAddress('');
      setZipcode('');
      setCity('');
      setState('');
      setCountry('');
    }
  }, [userProfileData, useProfileInfo]);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    const getProfileData = async (token) => {
      dispatch(
        getUpdateProfileData({
          token: token,
        })
      );
    };
    getProfileData(token);
  }, []);

  return (
    <div id="containerStripe">
      <h1 className="checkout-title">Checkout</h1>
      <p className="checkout-description">
        Review your order and complete your purchase.
      </p>
      <div className="StripeBodyContainer">
        <div className="StripeBodyContainer1">
          <h1 className="checkout-title">Cart</h1>
          {cartData ? (
            cartData.map((item, index) => (
              <div className="product" key={item.id}>
                <div className="product-column">
                  <img
                    className="cart-product-image"
                    src={item.imageUrl}
                    alt={item.name}
                  />
                </div>
                <div className="product-column">
                  <div className="flex top">
                    <h5>{item.title} </h5>
                  </div>
                </div>
                <div className="product-column">
                  <p className="quantity-desc">{arrayOfQuantity[index]}</p>
                </div>
                <div className="product-column">
                  <h4 className="totalPriceProduct">${item.price} </h4>
                </div>

                <div className="product-column">
                  <p className="totalPriceProductss"> Product Price Total </p>
                  <h4 className="totalPriceProducts">
                    ${(item.price * arrayOfQuantity[index]).toFixed(2)}{' '}
                  </h4>
                </div>
              </div>
            ))
          ) : (
            <h1>Loading...</h1>
          )}
          <div className="cart-bottoms">
            <div className="total">
              <h3> Subtotal: </h3>
              <h3> ${getTotalAmount()} </h3>
            </div>
          </div>
        </div>
        <div className="StripeBodyContainer2">
          <h1 className="checkout-title">Personal Information</h1>
          <div className="checkboxContainer">
            <div className="checkbox">
              <input
                type="checkbox"
                checked={useProfileInfo}
                onChange={handleUseProfileInfoChange}
              />
              <h5> Use information from profile?</h5>
            </div>

            <div className="checkbox">
              <input
                type="checkbox"
                checked={sameAddress}
                onChange={handleSameAddressChange}
              />
              <h5> Same Shipping/Billing Address?</h5>
            </div>
          </div>

          <form id="checkout-form" className="checkout-form">
            {sameAddress === false ? (
              <h3 className="paymentText"> Shipping Address </h3>
            ) : null}
            <div className="group">
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={firstName}
                onChange={firstNameHandler}
                required
              />
              <span class="highlight"></span>
              <span class="bar"></span>
              <label>First Name</label>
            </div>
            <div className="group">
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={lastName}
                onChange={lastNameHandler}
                required
              />
              <span class="highlight"></span>
              <span class="bar"></span>
              <label>Last Name</label>
            </div>

            <div className="group">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={emailHandler}
                required
              />
              <span class="highlight"></span>
              <span class="bar"></span>
              <label>Email</label>
            </div>

            <div className="group">
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={addressHandler}
                required
              />
              <span class="highlight"></span>
              <span class="bar"></span>
              <label>Address</label>
            </div>

            <div className="group">
              <input
                type="text"
                id="zipcode"
                name="zipcode"
                value={zipcode}
                onChange={zipcodeHandler}
                required
              />
              <span class="highlight"></span>
              <span class="bar"></span>
              <label>Zipcode</label>
            </div>

            <div className="group">
              <input
                type="text"
                id="city"
                name="city"
                value={city}
                onChange={cityHandler}
                required
              />
              <span class="highlight"></span>
              <span class="bar"></span>
              <label>City</label>
            </div>

            <div className="group">
              <input
                type="text"
                id="state"
                name="state"
                value={state}
                onChange={stateHandler}
                required
              />
              <span class="highlight"></span>
              <span class="bar"></span>
              <label>State/Region</label>
            </div>

            <div className="group">
              <input
                type="text"
                id="country"
                name="country"
                value={country}
                onChange={countryHandler}
                required
              />
              <span class="highlight"></span>
              <span class="bar"></span>
              <label>Country</label>
            </div>

            <div className="group">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={phoneNumber}
                onChange={phoneNumberHandler}
                required
              />
              <span class="highlight"></span>
              <span class="bar"></span>
              <label>Phone Number</label>
            </div>

            {sameAddress === false ? (
              <>
                <h3 className="paymentText"> Billing Address </h3>
                <div className="group">
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={shippingAddress}
                    onChange={shippingAddressHandler}
                    required
                  />
                  <span class="highlight"></span>
                  <span class="bar"></span>
                  <label>Address</label>
                </div>

                <div className="group">
                  <input
                    type="text"
                    id="zipcode"
                    name="zipcode"
                    value={shippingZipcode}
                    onChange={shippingZipcodeHandler}
                    required
                  />
                  <span class="highlight"></span>
                  <span class="bar"></span>
                  <label>Zipcode</label>
                </div>

                <div className="group">
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={shippingCity}
                    onChange={shippingCityHandler}
                    required
                  />
                  <span class="highlight"></span>
                  <span class="bar"></span>
                  <label>City</label>
                </div>

                <div className="group">
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={shippingState}
                    onChange={shippingStateHandler}
                    required
                  />
                  <span class="highlight"></span>
                  <span class="bar"></span>
                  <label>State/Region</label>
                </div>

                <div className="group">
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={shippingCountry}
                    onChange={shippingCountryHandler}
                    required
                  />
                  <span class="highlight"></span>
                  <span class="bar"></span>
                  <label>Country</label>
                </div>
              </>
            ) : null}

            {showItem ? (
              <>
                <label htmlFor="Stripe">Stripe Payment:</label>
                <StripeContainer
                  totalAmount={totalAmount}
                  storageObject={storageObject}
                  // userId={userProfileData.id}
                />
              </>
            ) : (
              <>
                <button
                  className="checkout-button"
                  onClick={() => setShowItem(true)}>
                  Checkout!
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
