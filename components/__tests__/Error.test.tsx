import { render, fireEvent } from '@testing-library/react';
import Error from '../Error';

const mockRouter = {
  push: jest.fn(),
};

jest.mock('next/router', () => ({
  useRouter: () => mockRouter,
}));

describe('Error', () => {
  it('displays error text', async () => {
    const { findByText } = render(<Error />);

    await findByText('Whoops!');
    await findByText('Sorry, something went wrong.');
  });

  describe('Back to products button', () => {
    it('returns users to the index page when clicked', async () => {
      const { findByTestId } = render(<Error />);

      const button = await findByTestId('Error__Button');

      fireEvent.click(button);

      expect(mockRouter.push).toHaveBeenCalledTimes(1);
      expect(mockRouter.push).toHaveBeenCalledWith('/');
    });
  });
});
