import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SummaryForm from '../SummaryForm';

describe('SummaryForm testing', () => {
  test('Checkbox is unchecked and button is disabled by default', () => {
    render(<SummaryForm />);

    const button = screen.getByRole('button', { name: /confirm order/i });
    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    });

    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });

  test('Checking checkbox enables button and unchecking it disables again', () => {
    render(<SummaryForm />);

    const button = screen.getByRole('button', { name: /confirm order/i });
    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    });

    userEvent.click(checkbox);

    expect(button).toBeEnabled();

    userEvent.click(checkbox);

    expect(button).toBeDisabled();
  });

  test('Popover response to user hover', async () => {
    render(<SummaryForm />);

    // Inicialmente o popover não aparece na tela
    const hiddenPopover = screen.queryByText(
      /no ice cream will actually be delivered/i,
    );

    expect(hiddenPopover).not.toBeInTheDocument();

    // Popover aparece com o hover do usuário na label da checkbox
    const termsAndConditionsLabel = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndConditionsLabel);
    const activePopover = screen.getByText(
      /no ice cream will actually be delivered/i,
    );

    expect(activePopover).toBeInTheDocument();

    // Popover desaparece quando não há mais o hover
    userEvent.unhover(termsAndConditionsLabel);

    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivered/i),
    );
  });
});
