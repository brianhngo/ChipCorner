import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import StripeContainer from './StripContainer';
import { getCartData } from '../CartPageSlice';

const CheckoutPage = () => {
  const [showItem, setShowItem] = useState(true);
  const cartData = useSelector((state) => state.order.cartData);
  const dispatch = useDispatch();

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

  const totalAmount = getTotalAmount()
  return (
    <div id='containerStripe'>
      <h1 className='checkout-title'>Checkout</h1>
      <p className='checkout-description'>
        Review your order and complete your purchase.
      </p>
      <div className = 'StripeBodyContainer'>
        <div className = 'StripeBodyContainer1'>
      <h1 className='checkout-title'>Cart</h1>
      {cartData ? (
        cartData.map((item, index) => (
          <div className='product' key={item.id}>
            <div className='product-column'>
              <img
                className='cart-product-image'
                src={item.imageUrl}
                alt={item.name}
              />
            </div>
            <div className='product-column'>
              <div className='flex top'>
                <h5>{item.title} </h5>
              </div>
            </div>
            <div className='product-column'>
              <p className='quantity-desc'>{arrayOfQuantity[index]}</p>
            </div>
            <div className='product-column'>
              <h4 className='totalPriceProduct'>${item.price} </h4>
            </div>

            <div className='product-column'>
              <p className='totalPriceProductss'> Product Price Total </p>
              <h4 className='totalPriceProducts'>
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
      <div className = 'StripeBodyContainer2'>
      <h1 className='checkout-title'>Personal Information</h1>
      <form id='checkout-form' className='checkout-form'>

        <div className='form-group'>
          <label htmlFor='name'>Name:</label>
          <input type='text' id='name' name='name' required />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input type='email' id='email' name='email' required />
        </div>

        <div className='form-group'>
          <label htmlFor='address'>Address:</label>
          <input type = 'text' id='address' name='address' required/>
        </div>

        <div className='form-group'>
          <label htmlFor='zipcode'>Zipcode:</label>
          <input type = 'text' id='zipcode' name='zipcode' required/>
        </div>

        <div className='form-group'>
          <label htmlFor='city'>City:</label>
          <input type = 'text' id='city' name='city' required/>
        </div>

        <div className='form-group'>
          <label htmlFor='state'>State/Region:</label>
          <input type = 'text' id='state' name='state' required/>
        </div>

        <div className='form-group'>
          <label htmlFor='country'>Country:</label>
          <input type='text' id='country' name='country' required />
        </div>

        <div className='form-group'>
          <label htmlFor='phone'>Phone Number:</label>
          <input type='tel' id='phone' name='phone' required />
        </div>


        {showItem ? (
          <>
          <label htmlFor='Stripe'>Stripe Payment:</label>
          <StripeContainer totalAmount = {totalAmount} />
          </>
        ) : (
          <>
            <button
              className='checkout-button'
              onClick={() => setShowItem(true)}
            >
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
