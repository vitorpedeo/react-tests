import { rest } from 'msw';
import userEvent from '@testing-library/user-event';

import {
  render,
  screen,
  waitFor,
} from '../../../test-utils/testing-library-utils';
import { server } from '../../../mocks/server';

import OrderEntry from '../OrderEntry';

// test.only = somente esse teste rodará
// test.skip = somente esse teste será pulado

describe('Order Entry testing', () => {
  test('Handle errors for scoops and toppings routes', async () => {
    server.resetHandlers(
      rest.get('http://localhost:3030/scoops', (request, response, context) => {
        return response(context.status(500));
      }),
      rest.get(
        'http://localhost:3030/toppings',
        (request, response, context) => {
          return response(context.status(500));
        },
      ),
    );

    render(<OrderEntry setOrderPhase={jest.fn()} />);

    await waitFor(async () => {
      const errorAlerts = await screen.findAllByRole('alert');
      expect(errorAlerts).toHaveLength(2);
    });
  });

  test('Order button is disabled if no scoops were provided', async () => {
    render(<OrderEntry setOrderPhase={jest.fn()} />);

    // Por padrão o botão deve estar desabilitado
    const orderButton = screen.getByRole('button', { name: /order sundae/i });
    expect(orderButton).toBeDisabled();

    // Ao informar um scoop o botão deve ativar
    const vanillaScoop = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaScoop);
    userEvent.type(vanillaScoop, '2');
    expect(orderButton).toBeEnabled();

    // O botão deve voltar a ser desativado se os scoops voltarem a 0
    userEvent.clear(vanillaScoop);
    userEvent.type(vanillaScoop, '0');
    expect(orderButton).toBeDisabled();
  });
});
