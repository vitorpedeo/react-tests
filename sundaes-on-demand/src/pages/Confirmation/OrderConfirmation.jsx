import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

import { useOrder } from '../../context/OrderContext';

import AlertBanner from '../common/AlertBanner';

const OrderConfirmation = ({ setOrderPhase }) => {
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(null);

  const [, , resetOrder] = useOrder();

  useEffect(() => {
    axios
      .post('http://localhost:3030/order')
      .then(response => setOrderNumber(response.data.orderNumber))
      .catch(error => {
        setError(true);
      });
  }, []);

  const handleClick = () => {
    resetOrder();

    setOrderPhase('inProgress');
  };

  if (error) {
    return <AlertBanner />;
  }

  if (orderNumber) {
    return (
      <div style={{ textAlign: 'center' }}>
        {error ? (
          <AlertBanner />
        ) : (
          <>
            <h1>Thank you!</h1>
            <p>Your order number is {orderNumber}</p>
            <p style={{ fontSize: '25%' }}>
              as per our terms and conditions, nothing will happen now
            </p>
          </>
        )}
        <Button onClick={handleClick}>Create new order</Button>
      </div>
    );
  } else {
    return <h1>Loading</h1>;
  }
};

export default OrderConfirmation;
