import Head from 'next/head';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { Row, Col, Typography, Breadcrumb, Space, Grid, Divider } from 'antd';
import { Product } from '../../apollo/schema';
import Skeleton from '../../components/Skeleton';
import FeedbackForm from '../../components/FeedbackForm';
import RatingsChart from '../../components/RatingsChart';
import ReviewList from '../../components/ReviewList';
import ProductInfo from '../../components/ProductInfo';
import Error from '../../components/Error';

interface GetProductByIdResponse {
  getProductById: Product;
}

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($productId: ID!) {
    getProductById(productId: $productId) {
      productId
      name
      description
      price
      reviews {
        reviewId
        productId
        name
        email
        created
        rating
        comment
      }
    }
  }
`;

/**
 * Renders the Customer Feedback page for a given product.
 */
const FeedbackPage: NextPage = () => {
  const router = useRouter();
  const { productId } = router.query;
  const breakpoints = Grid.useBreakpoint();

  const { data, loading, error } = useQuery<GetProductByIdResponse>(
    GET_PRODUCT_BY_ID,
    {
      variables: { productId },
    }
  );

  if (error) return <Error />;
  if (!data || loading) return <Skeleton />;

  return (
    <>
      <Head>
        <title>Customer Feedback - {data.getProductById.name}</title>
        <meta
          name="description"
          content={`View and submit feedback for ${data.getProductById.name}.`}
        />
      </Head>
      <Space direction="vertical">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/">Products</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{data.getProductById.name}</Breadcrumb.Item>
        </Breadcrumb>
        <Typography.Title level={1}>Customer Feedback</Typography.Title>
        <Row gutter={24}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={8}>
            <FeedbackForm />
          </Col>
          {!breakpoints.xxl && <Divider />}
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={16}>
            <ProductInfo product={data.getProductById} />
          </Col>
        </Row>
        <Divider />
        <Typography.Title level={2}>Ratings</Typography.Title>
        <RatingsChart reviews={data.getProductById.reviews} />
        <Divider />
        <Typography.Title level={2}>Latest comments</Typography.Title>
        <ReviewList reviews={data.getProductById.reviews} />
      </Space>
    </>
  );
};

export default FeedbackPage;
