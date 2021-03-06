import userEvent from '@testing-library/user-event';

import { render, screen } from '../../../test-utils/testing-library-utils';

import Options from '../Options';
import OrderEntry from '../OrderEntry';

describe('Total updates testing', () => {
  test('Scoops subtotal is correctly updated when scoops change', async () => {
    render(<Options optionType="scoops" />);

    // Verificando que o subtotal inicia-se com valor de R$ 0,00
    const scoopsSubtotal = screen.getByText('Scoops total: $', {
      exact: false,
    });
    expect(scoopsSubtotal).toHaveTextContent('0.00');

    // Atualizando o vanilla scoop para 1 e verificando o subtotal
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');
    expect(scoopsSubtotal).toHaveTextContent('2.00');

    // Atualizando o chocolate scoop para 2 e verificando o subtotal
    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, '2');
    expect(scoopsSubtotal).toHaveTextContent('6.00');
  });

  test('Toppings subtotal is correctly updated when toppings change', async () => {
    render(<Options optionType="toppings" />);

    // Verificando que o subtotal inicia-se com valor de R$ 0,00
    const toppingsSubtotal = screen.getByText('Toppings total: $', {
      exact: false,
    });
    expect(toppingsSubtotal).toHaveTextContent('0.00');

    // Marcando o cherries topping e verificando o subtotal
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    userEvent.click(cherriesCheckbox);
    expect(toppingsSubtotal).toHaveTextContent('1.50');

    // Marcando o hot fudge topping e verificando o subtotal
    const hotFudgeCheckbox = await screen.findByRole('checkbox', {
      name: 'Hot fudge',
    });
    userEvent.click(hotFudgeCheckbox);
    expect(toppingsSubtotal).toHaveTextContent('3.00');

    // Desmarcando o cherries topping e verificando o subtotal
    userEvent.click(cherriesCheckbox);
    expect(toppingsSubtotal).toHaveTextContent('1.50');
  });

  test('Grand total updates properly if scoop is added first', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', {
      name: /Grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent('0.00');

    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, '2');
    expect(grandTotal).toHaveTextContent('4.00');

    const mAndMsCheckbox = await screen.findByRole('checkbox', {
      name: 'M&Ms',
    });
    userEvent.click(mAndMsCheckbox);
    expect(grandTotal).toHaveTextContent('5.50');
  });
  test('Grand total updates properly if topping is added first', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('1.50');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');
    expect(grandTotal).toHaveTextContent('3.50');
  });
  test('Grand total updates properly if item is removed', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    const hotFudgeCheckbox = await screen.findByRole('checkbox', {
      name: 'Hot fudge',
    });
    userEvent.click(hotFudgeCheckbox);

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    userEvent.click(cherriesCheckbox);

    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, '4');

    userEvent.click(hotFudgeCheckbox);
    expect(grandTotal).toHaveTextContent('9.50');
  });
});
