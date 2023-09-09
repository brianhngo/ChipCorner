import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymanetForm';

const PUBLIC_KEY =
  'pk_test_51NoEPiFFjbVZ0rjaNYwhzPXsWGbZuL8Kdb6RDB4v8rsyN5Hcr3Eu2ii6aL9sPLmIl10mJKLkULUVT9ng1aygX6f600pv1mun3e';
const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
}

