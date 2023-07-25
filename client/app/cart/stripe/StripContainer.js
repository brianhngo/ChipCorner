import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymanetForm';

const PUBLIC_KEY =
  'pk_test_51NXVL6FALHsHDsiCvV9oCOsXYDvNbihzsBIn7vBNo4y1SaLq4yJr6GqIO5FA2PlduMigU1wq0cn9WlChqkWD4nCy00KRErPUnh';
const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
}
