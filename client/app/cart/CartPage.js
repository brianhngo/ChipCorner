import React, { useEffect } from 'react';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import Navbar from '../../features/navbar/Navbar';
import AppRoutes from '../AppRoutes';
import { useDispatch, useSelector } from 'react-redux';

const CartPage = () => {
  const orderDataList = useSelector((state) => state.order.orders);
  const dispatch = useDispatch();
  // deStringify the JSON stringify
  const grabCartFromStorage = JSON.parse(window.localStorage.getItem('cart'));
  // Array of product IDs
  const arrayOfProductId = Object.keys(grabCartFromStorage);
  console.log(arrayOfProductId);
  // Array of the Object ex/ [ {ProductId#1} : Quantity , {ProductId#2} : Quantity ]
  const arrayOfQuantity = Object.entries(grabCartFromStorage);

  return (
    <div id="container">
      <section id="headerSection">
        <header id="headerContainer">
          <div id="websiteTitle">
            <h3>The Chip Corner</h3>
            <img
              className="logoImage"
              src="https://media.istockphoto.com/id/164661881/vector/nachos-cartoon.jpg?s=612x612&w=0&k=20&c=AFnAYL79XMt0VQSVHtPRTuJUR1z0Iwig8LCzC3083Ag="
            />
          </div>
          <nav id="navContainer">
            <Navbar />
            <AppRoutes />
          </nav>
        </header>
      </section>
      {grabCartFromStorage === null ? <p> Wrong</p> : <p> Yes</p>}

      <section id="footerSection">
        <p> Copyrights © 2023 All Rights Reserved. The Chip Corner </p>
        <p> Beetal Team </p>
      </section>
    </div>
  );
};

export default CartPage;

// import React, { useEffect } from 'react';

// import HighlightOffIcon from '@mui/icons-material/HighlightOff';

// import Navbar from '../../features/navbar/Navbar';
// import AppRoutes from '../AppRoutes';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchOrder } from './CartPageSlice';

// const CartPage = () => {
//   const orderDataList = useSelector((state) => state.order.orders);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchOrder());
//   }, []);

//   return (
//     <div id='container'>
//       <section id='headerSection'>
//         <header id='headerContainer'>
//           <div id='websiteTitle'>
//             <h3>The Chip Corner</h3>
//             <img
//               className='logoImage'
//               src='https://media.istockphoto.com/id/164661881/vector/nachos-cartoon.jpg?s=612x612&w=0&k=20&c=AFnAYL79XMt0VQSVHtPRTuJUR1z0Iwig8LCzC3083Ag='
//             />
//           </div>
//           <nav id='navContainer'>
//             <Navbar />
//             <AppRoutes />
//           </nav>
//         </header>
//       </section>
//       {/* MidStart */}
//       {orderDataList.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         orderDataList.map((element) => {
//           return (
//             <div className='shoppingCartItem' key={element.id}>
//               <div className='shoppingCartItem__image'>
//                 <img
//                   className='shoppingCartItem__image'
//                   src={element.imageUrl}
//                 />
//               </div>

//               <p className='shoppingCartItem__title'>
//                 {element.title} - {element.price}
//               </p>
//               <button className='shoppingCartItem__button'>
//                 {<HighlightOffIcon />}
//               </button>
//             </div>
//           );
//         })
//       )}
//       {/* midEnd */}
//       <section id='footerSection'>
//         <p> Copyrights © 2023 All Rights Reserved. The Chip Corner </p>
//         <p> Beetal Team </p>
//       </section>
//     </div>
//   );
// };

// export default CartPage;
