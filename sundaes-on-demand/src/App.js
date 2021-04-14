import { useState } from 'react';
import { Container } from 'react-bootstrap';

import OrderProvider from './context/OrderContext';
import OrderEntry from './pages/Entry/OrderEntry';
import OrderSummary from './pages/Summary/OrderSummary';
import OrderConfirmation from './pages/Confirmation/OrderConfirmation';

const App = () => {
  const [orderPhase, setOrderPhase] = useState('inProgress');

  return (
    <OrderProvider>
      <Container>
        {orderPhase === 'inProgress' && (
          <OrderEntry setOrderPhase={setOrderPhase} />
        )}
        {orderPhase === 'review' && (
          <OrderSummary setOrderPhase={setOrderPhase} />
        )}
        {orderPhase === 'completed' && (
          <OrderConfirmation setOrderPhase={setOrderPhase} />
        )}
      </Container>
    </OrderProvider>
  );
};

export default App;
