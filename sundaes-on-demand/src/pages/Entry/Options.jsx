import { useState, useEffect } from 'react';
import axios from 'axios';
import { Row } from 'react-bootstrap';

import { formatCurrency } from '../../utils';
import { PRICE_PER_ITEM } from '../../constants';
import { useOrder } from '../../context/OrderContext';

import AlertBanner from '../common/AlertBanner';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';

const Options = ({ optionType }) => {
  const [orderDetails, updateItemCount] = useOrder();

  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  // optionType = 'scoops' | 'toppings'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then(response => setItems(response.data))
      .catch(error => setError(true));
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(PRICE_PER_ITEM[optionType])} each</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>
        {items.map(item => (
          <ItemComponent
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
            updateItemCount={(itemName, newItemCount) =>
              updateItemCount(itemName, newItemCount, optionType)
            }
          />
        ))}
      </Row>
    </>
  );
};

export default Options;
