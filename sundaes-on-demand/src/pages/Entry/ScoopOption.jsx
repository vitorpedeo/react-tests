import { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';

const ScoopOption = ({ name, imagePath, updateItemCount }) => {
  const [isValid, setIsValid] = useState(true);

  const handleChange = e => {
    const currentValue = e.target.value;
    const currentParsedValue = parseFloat(currentValue);

    const isValueValid =
      currentParsedValue >= 0 &&
      currentParsedValue <= 10 &&
      Math.floor(currentParsedValue) === currentParsedValue;
    setIsValid(isValueValid);

    if (isValueValid) {
      updateItemCount(name, currentValue);
    }
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: 10 }}
      >
        <Form.Label column xs="6" style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: 'left' }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
            isInvalid={!isValid}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ScoopOption;
