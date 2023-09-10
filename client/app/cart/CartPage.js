import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.js';
import AppRoutes from '../AppRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { getCartData } from './CartPageSlice';
import { useNavigate } from 'react-router-dom';

import { decreaseQuantity, increaseQuantity, removeQuantity } from '../cart/CartPageSlice.js';
import { AiFillStar, AiOutlineStar, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti'
import { toast } from 'react-toastify';

const CartPage = () => {
  // retrieves from cart db
  const cartData = useSelector((state) => state.order.cartData);
  const [cartDataSet, setCartDataSet] = useState([])
  const dispatch = useDispatch();
  const [showItem, setShowItem] = useState(false);
  
  const navigate = useNavigate();


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
  const [arrayQuantity, setArrayQuantity] = useState(arrayOfQuantity)
 

  useEffect(() => {
    dispatch(getCartData({ arrayOfProductIdInteger }));
    setCartDataSet(cartData)
  }, []);

  useEffect(() => {
    setCartDataSet(cartData)
  }, [cartData])

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
  
  const increaseQuantityHandler = (id,index) => {
    // increasing cart (product amount of certain product ID by 1)
    // increasing counter by 1 for NavBar
    const cartData = JSON.parse(window.localStorage.getItem('cart'))
    let cartNumber = JSON.parse(window.localStorage.getItem('cartNumber'))
    cartData[id] += 1;
    cartNumber += 1;
    arrayOfQuantity[index]++
   window.localStorage.setItem('cart', JSON.stringify(cartData));
    window.localStorage.setItem('cartNumber', JSON.stringify(cartNumber))
    setArrayQuantity(arrayOfQuantity)
      dispatch(increaseQuantity())
  }

  const decreaseQuantityHandler = (id,index) => {
    const cartData = JSON.parse(window.localStorage.getItem('cart'))
    let cartNumber = JSON.parse(window.localStorage.getItem('cartNumber'))
    // removing it from cart if you quantity reaches 0
    if (cartData[id] === 1){
      let value = cartData[id]
      delete cartData[id];
      cartNumber = cartNumber - value;
      let copyArrayOfQuantity = arrayOfQuantity.slice(0,index).concat(arrayOfQuantity.slice(index+1));
      let copyDataSet = setCartDataSet(cartDataSet.slice(0,index).concat(cartDataSet.slice(index+1)))
      setArrayQuantity(copyArrayOfQuantity)
      window.localStorage.setItem('cart', JSON.stringify(cartData));
      window.localStorage.setItem('cartNumber', JSON.stringify(cartNumber))
      dispatch(removeQuantity({
        value: value,
      }))
      toast.success('Removing This Product from Cart')
      return
    } else {
      // decreasing local storage values by 1
       cartData[id] -= 1;
      cartNumber -= 1;
      arrayOfQuantity[index] = arrayOfQuantity[index] - 1;
      setArrayQuantity(arrayOfQuantity)
    }
    window.localStorage.setItem('cart', JSON.stringify(cartData));
      window.localStorage.setItem('cartNumber', JSON.stringify(cartNumber))
       dispatch(decreaseQuantity())
   
  }

  const deleteProductHandler = (id, index) => {
    event.preventDefault();
    // accessing local storage
    const cartData = JSON.parse(window.localStorage.getItem('cart'))
    let cartNumber = JSON.parse(window.localStorage.getItem('cartNumber'))

    // deleting the cart (stored as object) of the product item
    let value = cartData[id]
    delete cartData[id];
    // decreasing the counter in local Storage. For the navbar counter
    cartNumber = cartNumber - value;
    // removing the deleted product from arrayOfQuantity, and array that we map for components
    let copyArrayOfQuantity = arrayOfQuantity.slice(0,index).concat(arrayOfQuantity.slice(index+1));
    let copyDataSet = setCartDataSet(cartDataSet.slice(0,index).concat(cartDataSet.slice(index+1)))
    setArrayQuantity(copyArrayOfQuantity)
    window.localStorage.setItem('cart', JSON.stringify(cartData));
    window.localStorage.setItem('cartNumber', JSON.stringify(cartNumber))

    // updating the counter in local storage. Navbar uses redux state.
    dispatch(removeQuantity({
      value: value,
    }))
    toast.success('Removed Item')
  }

  useEffect( () => {

  }, [decreaseQuantityHandler, increaseQuantityHandler, deleteProductHandler])

   


  return (
   <div id='container'>
 
  
  <div className="product-container">
    <h1> Cart </h1>
   

    {cartDataSet?.length > 0 ? (
      cartDataSet.map((item, index) => (
        <div className='product' key={item.id}>
          <div className='product-column'>
            <img className='cart-product-image' src={item.imageUrl} alt={item.name} />
          </div>
          <div className='product-column'>
             <p className='totalPriceProductss'> Product </p>
            <div className="flex top"> 
              <h5>{item.title} </h5>
            </div>
          </div>
          <div className='product-column'>
             <p className='totalPriceProductss'> Quantity </p>
            <p className="quantity-desc">
              <span className="minus" onClick={() => decreaseQuantityHandler(item.id,index)}>
                <AiOutlineMinus/> 
              </span>
              <span className="num" onClick="">
                {arrayOfQuantity[index]}
              </span>
              <span className="plus" onClick={() => increaseQuantityHandler(item.id,index)}>
                <AiOutlinePlus/> 
              </span>
            </p>
          </div>
          <div className='product-column'>
             <p className='totalPriceProductss'> Price per</p>
            <h4 className='totalPriceProduct'>${item.price} </h4>
          </div>
          <div className='product-column'>
            <p className='totalPriceProductss'> Product Price Total </p>
            <h4 className='totalPriceProducts'>${(item.price * arrayOfQuantity[index]).toFixed(2)} </h4>
          </div>
          <div className='product-column'>
            <button type='button' className='remove-item' onClick={ () => deleteProductHandler(item.id, index)}>
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
