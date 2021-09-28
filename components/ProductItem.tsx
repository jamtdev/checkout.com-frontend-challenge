import Link from 'next/link';
import Image from 'next/image';
import { Row, Col, Space, Card, Typography } from 'antd';
import { Product } from '../apollo/schema';

interface Props {
  product: Product;
}

/**
 * Displays a clickable card for a given product.
 */
const ProductItem = ({ product }: Props) => {
  return (
    <Link href={`/feedback/${product.productId}`} passHref>
      <Card
        data-testid={`ProductItem__${product.productId}`}
        hoverable
        cover={
          <Image
            src={`https://picsum.photos/seed/${product.name}/750`}
            alt="A randomly generated product placeholder image."
            width={750}
            height={750}
          />
        }
      >
        <Space direction="vertical">
          <Typography.Title level={2}>{product.name}</Typography.Title>
          <Typography.Paragraph ellipsis={{ rows: 3 }}>
            {product.description}
          </Typography.Paragraph>
          <Row justify="space-between">
            <Col>
              <Typography.Text strong>£{product.price}</Typography.Text>
            </Col>
            <Col>
              <Typography.Link
                data-testid="View__Link"
                href={`/feedback/${product.productId}`}
              >
                View
              </Typography.Link>
            </Col>
          </Row>
        </Space>
      </Card>
    </Link>
  );
};

export default ProductItem;
