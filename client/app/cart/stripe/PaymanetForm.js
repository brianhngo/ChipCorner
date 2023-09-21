import React, { useState, useEffect } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { submitOrder } from '../CartPageSlice';
import { getUpdateProfileData } from '../../MyProfile/ProfileSlice';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#fff',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#fce883' },
      '::placeholder': { color: '#87bbfd' },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
};

export default function PaymentForm({ totalAmount, storageObject }) {
  const amountInDollars = parseFloat(totalAmount);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const userProfileData = useSelector(
    (state) => state.profile.storage.information
  );
  console.log(userProfileData);

  const handleSubmits = async (e) => {
    e.preventDefault();
    console.log(storageObject['sameAddress']);

    if (storageObject['sameAddress'] === true) {
      // Copy values from billing address properties to shipping address properties
      storageObject['shippingAddress'] = storageObject['address'];
      storageObject['shippingCity'] = storageObject['city'];
      storageObject['shippingCountry'] = storageObject['country'];
      storageObject['shippingState'] = storageObject['state'];
      storageObject['shippingZipcode'] = storageObject['zipcode'];
    }
    const values = Object.values(storageObject);

    if (values.includes('')) {
      toast.error('ERROR One of the Input Spaces is blank');
      return;
    } else {
      console.log('The object does not contain any null values.');
    }
    const orderInformationToDB = {
      cart: window.localStorage.getItem('cart'),
      userInfo: storageObject,
      userId: userProfileData.id !== undefined ? userProfileData.id : 0,
    };
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post('http://localhost:8080/payment', {
          amount: Math.round(amountInDollars * 100),
          id,
        });
        if (response.data.success) {
          setSuccess(true);
          dispatch(submitOrder(orderInformationToDB));
        }
      } catch (error) {
        console.log('error', error);
      }
    } else {
      toast.error('Error Incorrect Payment');
    }
  };

  useEffect(() => {
    if (success) {
      toast.success('Success!');
      const redirectTimeout = setTimeout(() => {
        redirect();
      }, 4000);
      return () => clearTimeout(redirectTimeout);
    }
  }, [success]);

  const redirect = () => {
    navigate('/success');
  };

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
    <>
      {!success ? (
        <form>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement stripe-element options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button onClick={handleSubmits}>Pay</button>
        </form>
      ) : (
        <div>
          <h2>Thank You For Shopping At The Chip Corner</h2>
          <h3>redirecting now</h3>
          {localStorage.removeItem('cart')}
          {localStorage.removeItem('cartNumber')};
        </div>
      )}
    </>
  );
}
