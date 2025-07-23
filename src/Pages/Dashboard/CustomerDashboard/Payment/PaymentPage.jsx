import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaCreditCard } from 'react-icons/fa';
import UseAuth from "../../../../hooks/UseAuth";


const PaymentPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const {user}= UseAuth();

  const { applicationId, premium, policyName, frequency } = location.state || {};

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  // Fetch clientSecret on mount
  useEffect(() => {
    if (premium) {
      axiosSecure
        .post("/create-payment-intent", { amount: premium })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch(() => {
          toast.error("Failed to initiate payment.");
        });
    }
  }, [premium, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) return;

    setProcessing(true);

    const card = elements.getElement(CardElement);
    if (!card) {
      toast.error("Payment card info missing");
      setProcessing(false);
      return;
    }

    try {
      const { paymentMethod, error: methodError } = await stripe.createPaymentMethod({
        type: "card",
        card,
        billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "",
          },
      });

      if (methodError) {
        toast.error(methodError.message);
        setProcessing(false);
        return;
      }

      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
        
      });

      if (confirmError) {
        toast.error(confirmError.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        // Save transaction to DB
        const paymentData = {
          applicationId,
          email: user.email,
          name: user.displayName,
          transactionId: paymentIntent.id,
          amount: premium,
          frequency,
          policyName,
          status: "Paid",
          date: new Date(),
        };

        await axiosSecure.post("/payments", paymentData);

        // Update application status to Paid
        await axiosSecure.patch(`/applications/${applicationId}`, {
          paymentStatus: "Paid",
        });

        toast.success("✅ Payment successful!");
        navigate("/dashboard/payment-status");
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Something went wrong during payment.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-10 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl text-primary font-bold mb-4 flex items-center gap-2">
    <FaCreditCard className="text-xl" /> Payment for {policyName}
      </h2>
      <p className="mb-2 text-secondary">Premium Amount: <strong>${premium}</strong></p>
      <p className="mb-6 text-secondary">Payment Frequency: <strong className="">{frequency}</strong></p>

      <form onSubmit={handleSubmit}>
        <div className="border p-4 rounded mb-4">
          <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={!stripe || !clientSecret || processing}
        >
          {processing ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
