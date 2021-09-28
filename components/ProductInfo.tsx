import Image from 'next/image';
import { Product, Review } from '../apollo/schema';
import { Descriptions, Tag, TagProps } from 'antd';

interface Props {
  product: Product;
}

/**
 * Returns the average rating of a product based on all its reviews.
 */
export const getAverageRating = (reviews: Review[]) => {
  if (reviews.length === 0) return 0;

  const total = reviews.reduce((prev, curr) => prev + curr.rating, 0);

  return total / reviews.length;
};

/**
 * Returns a colour based on the value of a given product rating.
 */
export const getRatingColour = (rating: number): TagProps['color'] => {
  if (rating === 0) return 'blue';
  if (rating <= 2) return 'red';
  if (rating <= 3.5) return 'orange';

  return 'green';
};

/**
 * Renders a table displaying the information of a given product.
 */
const ProductInfo = ({ product }: Props) => {
  const averageRating = getAverageRating(product.reviews);
  const ratingColour = getRatingColour(averageRating);

  return (
    <Descriptions bordered>
      <Descriptions.Item label="Name" span={4}>
        {product.name}
      </Descriptions.Item>
      <Descriptions.Item label="Image" span={4}>
        <Image
          src={`https://picsum.photos/seed/${product.name}/250`}
          alt="A randomly generated product placeholder image."
          width={250}
          height={250}
        />
      </Descriptions.Item>
      <Descriptions.Item label="Price" span={4}>
        £{product.price}
      </Descriptions.Item>
      <Descriptions.Item label="Average Rating" span={4}>
        <Tag color={ratingColour}>
          {averageRating !== 0 ? averageRating.toFixed(1) : 'N/A'}
        </Tag>
      </Descriptions.Item>
      <Descriptions.Item label="Description" span={4}>
        {product.description}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default ProductInfo;
