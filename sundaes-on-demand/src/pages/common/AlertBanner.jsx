import { Alert } from 'react-bootstrap';

const AlertBanner = ({
  message = 'An unexpected error occurred. Please try again later.',
  variant = 'danger',
}) => {
  return (
    <Alert variant={variant} style={{ background: 'red' }}>
      {message}
    </Alert>
  );
};

export default AlertBanner;
