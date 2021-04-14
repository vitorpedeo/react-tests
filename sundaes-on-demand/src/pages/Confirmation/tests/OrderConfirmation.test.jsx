import { rest } from 'msw';

import { render, screen } from '../../../test-utils/testing-library-utils';
import { server } from '../../../mocks/server';

import OrderConfirmation from '../OrderConfirmation';

describe('Order confirmation testing', () => {
  test('Error alert is correctly being shown', async () => {
    server.resetHandlers(
      rest.post('http://localhost:3030/order', (request, response, context) => {
        return response(context.status(500));
      }),
    );

    render(<OrderConfirmation setOrderPhase={jest.fn()} />);

    const errorAlert = await screen.findByRole('alert');
    expect(errorAlert).toHaveTextContent(
      'An unexpected error occurred. Please try again later.',
    );
  });
});
