import { render, screen, fireEvent } from '@testing-library/react';
import App, { replaceCamelWithSpaces } from './App';

test('button has correct color', () => {
  render(<App />);

  const button = screen.getByRole('button', { name: 'Change to Midnight Blue' });

  // Testando se o botão tem a cor de background MediumVioletRed 
  expect(button).toHaveStyle({ background: 'MediumVioletRed' });

  // Simulando um clique no botão
  fireEvent.click(button);

  // Testando se o botão tem a cor de background MidnightBlue
  expect(button).toHaveStyle({ background: 'MidnightBlue' });
  
  // Testando se o texto do botão é 'Change to Medium Violet Red'
  expect(button).toHaveTextContent('Change to Medium Violet Red');
});

test('initial conditions for button and checkbox', () => {
  render(<App />);

  // Testando se o botão inicia ativado
  const button = screen.getByRole('button', { name: 'Change to Midnight Blue' });

  expect(button).toBeEnabled();
  
  
  // Testando se a checkbox inicia desmarcada
  const checkbox = screen.getByRole('checkbox');

  expect(checkbox).not.toBeChecked();
});

test('button is correctly being disabled and enabled', () => {
  render(<App />);

  const button = screen.getByRole('button', { name: 'Change to Midnight Blue' });
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });

  // Testando se o botão está sendo desativado
  fireEvent.click(checkbox);

  expect(button).toBeDisabled();

  // Testando se o botão está sendo reativado
  fireEvent.click(checkbox);

  expect(button).toBeEnabled();
});

test('button is grey when disabled', () => {
  render(<App />);

  const button = screen.getByRole('button', { name: 'Change to Midnight Blue' });
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });

  // Desativar botão -> botão se torna cinza 
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ background: 'gray' });
  
  // Ativar botão -> botão se torna vermelho
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ background: 'MediumVioletRed' });  

  // Mudar a cor do botão -> desativar botão -> botão se torna cinza
  fireEvent.click(button);
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ background: 'gray' });

  // Ativar botão -> botão se torna azul
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ background: 'MidnightBlue' }); 
});

describe('spaces before camelCase capital letters', () => {
  test('Works for words without inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');  
  });

  test('Works for words with one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });

  test('Works for words with multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });
});