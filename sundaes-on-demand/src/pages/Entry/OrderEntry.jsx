import { Button } from 'react-bootstrap';

import { useOrder } from '../../context/OrderContext';

import Options from './Options';

const OrderEntry = ({ setOrderPhase }) => {
  const [optionCounts] = useOrder();

  const isOrderDisabled = optionCounts.totals.scoops === '$0.00';

  return (
    <>
      <h1>Design your Sundae</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {optionCounts.totals.grandTotal}</h2>
      <Button
        onClick={() => setOrderPhase('review')}
        disabled={isOrderDisabled}
      >
        Order Sundae!
      </Button>
    </>
  );
};

export default OrderEntry;
