import 'antd/dist/antd.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../apollo/client';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={client}>
      <Layout>
        <>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          <Component {...pageProps} />
        </>
      </Layout>
    </ApolloProvider>
  );
}
