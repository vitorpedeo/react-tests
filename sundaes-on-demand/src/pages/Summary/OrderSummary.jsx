import { useOrder } from '../../context/OrderContext';

import SummaryForm from './SummaryForm';

const OrderSummary = ({ setOrderPhase }) => {
  const [orderDetails] = useOrder();

  const scoopArray = Array.from(orderDetails.scoops.entries());
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const toppingsArray = Array.from(orderDetails.toppings.entries());
  const toppingsList = toppingsArray.map(([key]) => <li key={key}>{key}</li>);

  return (
    <>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>{scoopList}</ul>
      {orderDetails.toppings.size > 0 && (
        <>
          <h2>Toppings: {orderDetails.totals.toppings}</h2>
          <ul>{toppingsList}</ul>
        </>
      )}
      <h2>Total: {orderDetails.totals.grandTotal}</h2>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </>
  );
};

export default OrderSummary;
