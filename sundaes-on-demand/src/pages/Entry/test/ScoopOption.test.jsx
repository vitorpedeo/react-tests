import userEvent from '@testing-library/user-event';

import { render, screen } from '../../../test-utils/testing-library-utils';

import ScoopOption from '../ScoopOption';

describe('Scoop option testing', () => {
  test('Inputs should turn red if invalid value was provided', async () => {
    render(
      <ScoopOption name="Chocolate" imagePath="" updateItemCount={jest.fn()} />,
    );

    const chocolateScoop = screen.getByRole('spinbutton', {
      name: 'Chocolate',
    });

    // Testando para valores negativos
    userEvent.clear(chocolateScoop);
    userEvent.type(chocolateScoop, '-2');
    expect(chocolateScoop).toHaveClass('is-invalid');

    // Testando para valores decimais
    userEvent.clear(chocolateScoop);
    userEvent.type(chocolateScoop, '2.3');
    expect(chocolateScoop).toHaveClass('is-invalid');

    // Testando para valores maiores que 10
    userEvent.clear(chocolateScoop);
    userEvent.type(chocolateScoop, '11');
    expect(chocolateScoop).toHaveClass('is-invalid');

    // Testando para valores maiores válidos
    userEvent.clear(chocolateScoop);
    userEvent.type(chocolateScoop, '2');
    expect(chocolateScoop).not.toHaveClass('is-invalid');
  });
});
