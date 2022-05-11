import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import Button, {BUTTON_TYPES_CLASSES} from "../button/button.component";
import {PaymentFormContainer, FormContainer} from "./payment-form.styles";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  
  const paymentHandler = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) return;
    
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({amount: 1000})
    }).then(res => res.json());
    
    const {paymentIntent: {client_secret}} = response;
    
    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "asldfékjasld"
        }
      }
    });
    
    if (paymentResult.error) {
      alert(paymentResult.error.message)
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Successful");
      }
    }
  };
  
  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <Button buttonType={BUTTON_TYPES_CLASSES.inverted}>Pay now</Button>
      </FormContainer>
    </PaymentFormContainer>
  )
};

export default PaymentForm;
