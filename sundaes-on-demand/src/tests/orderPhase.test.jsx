import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

describe('Order phases flow', () => {
  test('Happy path test', async () => {
    render(<App />);

    // Adicionando scoops e toppings
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');

    const mAndMsCheckbox = await screen.findByRole('checkbox', {
      name: 'M&Ms',
    });
    userEvent.click(mAndMsCheckbox);

    const hotFudgeCheckbox = await screen.findByRole('checkbox', {
      name: 'Hot fudge',
    });
    userEvent.click(hotFudgeCheckbox);

    // Clicando no botão de pedido
    const orderButton = screen.getByRole('button', { name: /order sundae/i });
    userEvent.click(orderButton);

    // Verificando as informações do sumário baseado no pedido
    const orderSummaryHeading = screen.getByRole('heading', {
      name: 'Order Summary',
    });
    expect(orderSummaryHeading).toBeInTheDocument();

    const scoopsHeading = screen.getByRole('heading', {
      name: 'Scoops: $4.00',
    });
    expect(scoopsHeading).toBeInTheDocument();
    expect(screen.getByText('2 Vanilla')).toBeInTheDocument();

    const toppingsHeading = screen.getByRole('heading', {
      name: 'Toppings: $3.00',
    });
    expect(toppingsHeading).toBeInTheDocument();
    expect(screen.getByText('M&Ms')).toBeInTheDocument();
    expect(screen.getByText('Hot fudge')).toBeInTheDocument();

    const totalHeading = screen.getByRole('heading', { name: 'Total: $7.00' });
    expect(totalHeading).toBeInTheDocument();

    // Aceitando os termos e condições e clicando no botão para confirmar o pedido
    const termsAndConditionsCheckbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    });
    const confirmationButton = screen.getByRole('button', {
      name: /confirm order/i,
    });
    userEvent.click(termsAndConditionsCheckbox);
    userEvent.click(confirmationButton);

    // Confirmando que aparece um Loading na página de confirmação
    const loadingHeading = screen.getByRole('heading', {
      name: /loading/i,
    });
    expect(loadingHeading).toBeInTheDocument();

    // Confirmando que existe um número do pedido na página de confirmação
    const orderNumber = await screen.findByText(/order number/i);
    expect(orderNumber).toBeInTheDocument();

    // Confirmando que o Loading desaparece da página de confirmação
    const disapearedLoadingHeading = screen.queryByRole('heading', {
      name: /loading/i,
    });
    expect(disapearedLoadingHeading).not.toBeInTheDocument();

    // Clicando no botão de novo pedido
    const newOrderButton = screen.getByRole('button', {
      name: /create new order/i,
    });
    userEvent.click(newOrderButton);

    // Verificando se todos os valores foram resetados
    const scoopsSubtotal = screen.getByText('Scoops total: $', {
      exact: false,
    });
    expect(scoopsSubtotal).toHaveTextContent('0.00');

    const toppingsSubtotal = screen.getByText('Toppings total: $', {
      exact: false,
    });
    expect(toppingsSubtotal).toHaveTextContent('0.00');

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent('0.00');

    // Evitando erros de update após o fim do teste
    await screen.findByRole('spinbutton', { name: 'Vanilla' });
    await screen.findByRole('checkbox', { name: 'M&Ms' });
    await screen.findByRole('checkbox', { name: 'Hot fudge' });
  });

  test('Toppings header should not appear at summary page if no toppings were selected', async () => {
    render(<App />);

    // Adicionando o scoop de chocolate
    const chocolateScoop = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    });
    userEvent.clear(chocolateScoop);
    userEvent.type(chocolateScoop, '4');

    // Confirmando pedido
    const orderButton = screen.getByRole('button', { name: /order sundae/i });
    userEvent.click(orderButton);

    // Confirmando que o total dos scoops está correto
    const scoopsTotal = screen.getByRole('heading', { name: 'Scoops: $8.00' });
    expect(scoopsTotal).toBeInTheDocument();

    // Confirmando que os toppings não aparecem na tela
    const toppingsTotal = screen.queryByRole('heading', {
      name: /Toppings: \$/i,
    });
    expect(toppingsTotal).not.toBeInTheDocument();
  });
});
