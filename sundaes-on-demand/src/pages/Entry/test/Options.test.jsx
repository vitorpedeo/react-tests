import userEvent from '@testing-library/user-event';

import { render, screen } from '../../../test-utils/testing-library-utils';

import Options from '../Options';

describe('Options testing', () => {
  test('Display images for each scoop from the server', async () => {
    render(<Options optionType="scoops" />);

    // Encontrando as imagens
    const images = await screen.findAllByRole('img', { name: /scoop$/i });
    expect(images).toHaveLength(2);

    // Confirmando o alt text das imagens
    const altTexts = images.map(element => element.alt);
    expect(altTexts).toEqual(['Chocolate scoop', 'Vanilla scoop']);
  });

  test('Display images for each topping from the server', async () => {
    render(<Options optionType="toppings" />);

    const images = await screen.findAllByRole('img', { name: /topping$/i });
    expect(images).toHaveLength(3);

    const altTexts = images.map(element => element.alt);
    expect(altTexts).toEqual([
      'Cherries topping',
      'M&Ms topping',
      'Hot fudge topping',
    ]);
  });

  test('Scoops subtotal should not be updated when invalid values were provided', async () => {
    render(<Options optionType="scoops" />);

    const vanillaScoop = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    const scoopsSubtotal = screen.getByText('Scoops total: $', {
      exact: false,
    });

    // Testando para valores negativos
    userEvent.clear(vanillaScoop);
    userEvent.type(vanillaScoop, '-2');
    expect(scoopsSubtotal).toHaveTextContent('0.00');

    // Testando para valores maiores válidos
    userEvent.clear(vanillaScoop);
    userEvent.type(vanillaScoop, '2');
    expect(scoopsSubtotal).toHaveTextContent('4.00');
  });
});
