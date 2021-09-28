import { useRouter } from 'next/router';
import { Result, Button } from 'antd';

/**
 * Renders a generic error page.
 */
const Error = () => {
  const router = useRouter();

  return (
    <Result
      status="404"
      title="Whoops!"
      subTitle="Sorry, something went wrong."
      extra={
        <Button
          data-testid="Error__Button"
          type="primary"
          onClick={() => router.push('/')}
        >
          Back to products
        </Button>
      }
    />
  );
};

export default Error;
