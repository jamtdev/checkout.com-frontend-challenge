import { render } from '@testing-library/react';
import Layout from '../Layout';

describe('Layout', () => {
  it('displays the page footer', async () => {
    const { findByTestId, findByText } = render(
      <Layout>
        <div>Hello, World!</div>
      </Layout>
    );

    await findByTestId('Footer');
    await findByText('© James Taylor (on behalf of Checkout.com).');
  });
});
