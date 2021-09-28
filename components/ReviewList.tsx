import { useState } from 'react';
import { List, Alert, Pagination, Row, Col, Space } from 'antd';
import { Review } from '../apollo/schema';
import ReviewItem from './ReviewItem';

interface Props {
  reviews: Review[];
}

const maxItemsPerPage = 6;

/**
 * Renders a paginated grid displaying a product's reviews.
 */
const ReviewList = ({ reviews }: Props) => {
  const [page, setPage] = useState({ min: 0, max: maxItemsPerPage });

  /**
   * Update pagination indexes based on the newly selected page number.
   */
  const handleChange = (value: number) => {
    setPage({
      min: (value - 1) * maxItemsPerPage,
      max: value * maxItemsPerPage,
    });
  };

  if (reviews.length === 0)
    return (
      <Alert
        message="There are no comments for this product yet."
        type="info"
      />
    );

  return (
    <>
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
        dataSource={reviews.slice(page.min, page.max)}
        renderItem={(review) => (
          <List.Item>
            <ReviewItem key={review.reviewId} review={review} />
          </List.Item>
        )}
      />
      <Row justify="center">
        <Col>
          <Pagination
            defaultPageSize={maxItemsPerPage}
            onChange={handleChange}
            total={reviews.length}
          />
        </Col>
      </Row>
    </>
  );
};

export default ReviewList;
