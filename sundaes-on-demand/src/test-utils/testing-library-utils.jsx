import { render } from '@testing-library/react';

import OrderProvider from '../context/OrderContext';

const renderWithProvider = (ui, options) =>
  render(ui, { wrapper: OrderProvider, ...options });

export * from '@testing-library/react';
export { renderWithProvider as render };
