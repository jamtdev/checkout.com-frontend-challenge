import { List } from 'antd';
import { Product } from '../apollo/schema';
import ProductItem from './ProductItem';

interface Props {
  products: Product[];
}

/**
 * Renders a grid of product cards.
 */
const ProductList = ({ products }: Props) => {
  return (
    <List
      grid={{
        gutter: 24,
        xs: 1,
        sm: 1,
        md: 1,
        lg: 2,
        xl: 2,
        xxl: 3,
      }}
      dataSource={products}
      renderItem={(product) => (
        <List.Item>
          <ProductItem key={product.productId} product={product} />
        </List.Item>
      )}
    />
  );
};

export default ProductList;
