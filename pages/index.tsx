import Head from 'next/head';
import { gql } from '@apollo/client';
import { Typography, Space } from 'antd';
import { useQuery } from '@apollo/client';
import { initialiseApollo } from '../apollo/client';
import { Product } from '../apollo/schema';
import Skeleton from '../components/Skeleton';
import ProductList from '../components/ProductList';
import Error from '../components/Error';

interface GetProductsResponse {
  getProducts: Product[];
}

const GET_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      productId
      name
      description
      price
    }
  }
`;

/**
 * Renders the index ("Products") page.
 */
const Index = () => {
  const { data, loading, error } = useQuery<GetProductsResponse>(GET_PRODUCTS);

  if (error) return <Error />;
  if (!data || loading) return <Skeleton />;

  return (
    <>
      <Head>
        <title>Products</title>
        <meta
          name="description"
          content={`View and submit feedback for different products within our catalogue.`}
        />
      </Head>
      <Space direction="vertical">
        <Typography.Title>Products</Typography.Title>
        <ProductList products={data.getProducts} />
      </Space>
    </>
  );
};

/**
 * Server-side data fetching.
 */
export async function getServerSideProps() {
  const apolloClient = initialiseApollo();

  await apolloClient.query({
    query: GET_PRODUCTS,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Index;
