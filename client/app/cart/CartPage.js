import React, { useEffect } from 'react';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Link } from 'react-router-dom';
import Navbar from '../../features/navbar/Navbar';
import AppRoutes from '../AppRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { getCartData } from './CartPageSlice';

const CartPage = () => {
  const orderDataList = useSelector((state) => state.order.orders);
  const cartData = useSelector((state) => state.order.cartData);

  const dispatch = useDispatch();
  // deStringify the JSON stringify
  const grabCartFromStorage =
    JSON.parse(window.localStorage.getItem('cart')) || {};
  // Array of product IDs
  const arrayOfProductId = Object.keys(grabCartFromStorage) || [];
  const arrayOfProductIdInteger = arrayOfProductId.map((element) =>
    parseInt(element)
  );

  // Array of the Object ex/ [ {ProductId#1} : Quantity , {ProductId#2} : Quantity ]
  const arrayOfQuantity = Object.entries(arrayOfProductIdInteger) || [];
  console.log(arrayOfQuantity);
  const testing = Object.values(grabCartFromStorage);

  useEffect(() => {
    dispatch(getCartData({ arrayOfProductIdInteger }));
  }, []);

  return (
    <div id="container">
      <section id="headerSection">
        <header id="headerContainer">
          <div id="websiteTitle">
            <h3>All Chips</h3>
            <img
              className="logoImage"
              src="https://media.istockphoto.com/id/164661881/vector/nachos-cartoon.jpg?s=612x612&w=0&k=20&c=AFnAYL79XMt0VQSVHtPRTuJUR1z0Iwig8LCzC3083Ag="
            />
          </div>
          <nav id="navContainer">
            <Link to="/"> Home </Link>
            <Link to="/allchips"> All Chips </Link>
            <Link to="/signup">Sign Up</Link>
            <AppRoutes />
            <Navbar />
          </nav>
        </header>
      </section>

      <div>
        {cartData ? (
          cartData.map((item, index) => (
            <div key={index}>
              <h4>{item.title}</h4>
              <img src={item.imageUrl} alt={item.name} />
              <p>Price: ${item.price}</p>
              <p> {testing[index]} </p>
            </div>
          ))
        ) : (
          <p>Empty</p>
        )}
      </div>
      <div>
        {arrayOfQuantity ? (
          arrayOfQuantity.map((item, index) => (
            <div key={index}>
              <h4>{item.index}</h4>
            </div>
          ))
        ) : (
          <p>Empty</p>
        )}
      </div>

      <section id="footerSection">
        <p> Copyrights © 2023 All Rights Reserved. The Chip Corner </p>
        <p> Beetal Team </p>
      </section>
    </div>
  );
};

export default CartPage;
