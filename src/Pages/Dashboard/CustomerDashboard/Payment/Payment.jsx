import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentPage from './PaymentPage';
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Key);
const Payment = () => {
    return (
        <Elements stripe={stripePromise}> 
           <PaymentPage/>
        </Elements>
    );
};

export default Payment;