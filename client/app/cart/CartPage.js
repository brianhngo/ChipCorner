import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.js';
import AppRoutes from '../AppRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { getCartData } from './CartPageSlice';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { AiFillStar, AiOutlineStar, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti'

const CartPage = () => {
  // retrieves from cart db
  const cartData = useSelector((state) => state.order.cartData);
  
  const [showItem, setShowItem] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Getting the Amount from cart
  // deStringify the JSON stringify
  const grabCartFromStorage =
    JSON.parse(window.localStorage.getItem('cart')) || {};
    console.log(grabCartFromStorage)
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

  const handleCheckout = () => {
    if (cartData && cartData.length > 0) {
      // Redirect to the payment page when the cart is not empty
      navigate('/payment');
    } else {
      // Show an alert when the cart is empty
      toast.error('Empty Cart!');
    }
  };
  
  const increaseQuantityHandler = (index) => {
    const cartData = JSON.parse(window.localStorage.getItem('cart'))
    let cartNumber = JSON.parse(window.localStorage.getItem('cartNumber'))
    cartData[index] += 1;
    cartNumber += 1;
    arrayOfQuantity[index]++
   window.localStorage.setItem('cart', JSON.stringify(cartData));
    window.localStorage.setItem('cartNumber', JSON.stringify(cartNumber))
  }

  const decreaseQuantityHandler = (index) => {
    const cartData = JSON.parse(window.localStorage.getItem('cart'))
    let cartNumber = JSON.parse(window.localStorage.getItem('cartNumber'))
    if (cartData[index] === 0){
      return
    } else {
       cartData[index] -= 1;
      cartNumber -= 1;
      arrayOfQuantity[index]--
    }
    window.localStorage.setItem('cart', JSON.stringify(cartData));
      window.localStorage.setItem('cartNumber', JSON.stringify(cartNumber))
   
  }

  useEffect( () => {

  }, [decreaseQuantityHandler, increaseQuantityHandler])

  return (
   <div id='container'>
  <Toaster />
  
  <div className="product-container">
    <h1> Cart </h1>
   

    {cartData ? (
      cartData.map((item, index) => (
        <div className='product' key={item.id}>
          <div className='product-column'>
            <img className='cart-product-image' src={item.imageUrl} alt={item.name} />
          </div>
          <div className='product-column'>
            <div className="flex top"> 
              <h5>{item.title} </h5>
            </div>
          </div>
          <div className='product-column'>
            <p className="quantity-desc">
              <span className="minus" onClick={() => decreaseQuantityHandler(index)}>
                <AiOutlineMinus/> 
              </span>
              <span className="num" onClick="">
                {arrayOfQuantity[index]}
              </span>
              <span className="plus" onClick={() => increaseQuantityHandler(index)}>
                <AiOutlinePlus/> 
              </span>
            </p>
          </div>
          <div className='product-column'>
            <h4 className='totalPriceProduct'>${item.price} </h4>
          </div>
          <div className='product-column'>
            <p className='totalPriceProductss'> Product Price Total </p>
            <h4 className='totalPriceProducts'>${(item.price * arrayOfQuantity[index]).toFixed(2)} </h4>
          </div>
          <div className='product-column'>
            <button type='button' className='remove-item' onClick="">
              <TiDeleteOutline/>
            </button>
          </div>
        </div>
      ))
    ) : (
      <div className = 'emptyContainer'>
      <p>The Cart is empty!!</p>
      <img className='cart-product-image' src={'emptyCart.png'} />
      </div>
    )}

    <div className="cart-bottom"> 
      <div className="total">
        <h3> Subtotal: </h3>
        <h3> ${getTotalAmount()} </h3>
      </div>
      <div className='btn-container'>
        <button type='button' className='btn' onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  </div>
</div>
  );
};

export default CartPage;
