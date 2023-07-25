import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../features/navbar/Navbar';
import AppRoutes from '../AppRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { getCartData } from './CartPageSlice';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const orderDataList = useSelector((state) => state.order.orders);
  const cartData = useSelector((state) => state.order.cartData);
  const [showItem, setShowItem] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // deStringify the JSON stringify
  const grabCartFromStorage =
    JSON.parse(window.localStorage.getItem('cart')) || {};
  // Array of product IDs
  const arrayOfProductId = Object.keys(grabCartFromStorage) || [];
  console.log(arrayOfProductId, 'this is the id');
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

  const handleCheckout = () => {
    if (cartData && cartData.length > 0) {
      // Redirect to the payment page when the cart is not empty
      navigate('/payment');
    } else {
      // Show an alert when the cart is empty
      alert('Your cart is empty. Add items to proceed to checkout.');
    }
  };
  const handleIncrement = (productId) => {
    const updatedCart = { ...grabCartFromStorage };
    updatedCart[productId]++;
    window.localStorage.setItem('cart', JSON.stringify(updatedCart));
    setShowItem(!showItem);
  };

  const handleDecrement = (productId) => {
    const updatedCart = { ...grabCartFromStorage };
    if (updatedCart[productId] > 1) {
      updatedCart[productId]--;
      window.localStorage.setItem('cart', JSON.stringify(updatedCart));
      setShowItem(!showItem);
    }
  };

  const handleRemoveItem = (productId) => {
    const updatedCart = { ...grabCartFromStorage };
    delete updatedCart[productId];
    window.localStorage.setItem('cart', JSON.stringify(updatedCart));
    setShowItem(!showItem); // Trigger re-render to reflect the changes
  };

  return (
    <div id='container'>
      <section id='headerSection'>
        <header id='headerContainer'>
          <div id='websiteTitle'>
            <h3>The Chip Corner</h3>
            <img
              className='logoImage'
              src='https://media.istockphoto.com/id/164661881/vector/nachos-cartoon.jpg?s=612x612&w=0&k=20&c=AFnAYL79XMt0VQSVHtPRTuJUR1z0Iwig8LCzC3083Ag='
            />
          </div>
          <nav id='navContainer'>
            <Link to='/'> Home </Link>
            <Link to='/allchips'> All Chips </Link>
            <Link to='/signup'>Sign Up</Link>
            <AppRoutes />
            <Navbar />
          </nav>
        </header>
      </section>
      <div>
        {cartData ? (
          cartData.map((item, index) => (
            <div key={index}>
              <button onClick={() => handleRemoveItem(arrayOfProductId[index])}>
                x
              </button>
              <h4>{item.title}</h4>
              <img src={item.imageUrl} alt={item.name} />
              <p>Price: ${item.price}</p>
              <p>quanity: {arrayOfQuantity[index]}</p>
              <button onClick={() => handleDecrement(arrayOfProductId[index])}>
                -
              </button>
              <button onClick={() => handleIncrement(arrayOfProductId[index])}>
                +
              </button>
            </div>
          ))
        ) : (
          <p>Empty</p>
        )}
      </div>
      <div>
        <h2>Total Amount: ${getTotalAmount()}</h2>
      </div>
      <button onClick={handleCheckout}>Checkout</button>
      <section id='footerSection'>
        <p> Copyrights © 2023 All Rights Reserved. The Chip Corner </p>
        <p> Beetal Team </p>
      </section>
    </div>
  );
};

export default CartPage;
