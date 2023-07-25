import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import StripeContainer from './StripContainer';

const CheckoutPage = () => {
  const [showItem, setShowItem] = useState(true);

  return (
    <div id='container'>
      <h1 id='ThankYouText'>Than You For Shopping At The Chip Corner</h1>
      {showItem ? (
        <StripeContainer />
      ) : (
        <>
          <button id='CheckOutBtn' onClick={() => setShowItem(true)}>
            Checkout!
          </button>
        </>
      )}
      <section id='footerSection'>
        <p> Copyrights © 2023 All Rights Reserved. The Chip Corner </p>
        <p> Beetal Team </p>
      </section>
    </div>
  );
};

export default CheckoutPage;
