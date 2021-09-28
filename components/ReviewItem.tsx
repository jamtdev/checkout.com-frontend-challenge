import { Space, Card, Typography, Rate } from 'antd';
import moment from 'moment';
import { Review } from '../apollo/schema';

interface Props {
  review: Review;
}

/**
 * Renders a card displaying a specific product review.
 */
const ReviewItem = ({ review }: Props) => {
  const formattedDate = moment(review.created).format('dddd, MMMM Do YYYY');

  return (
    <Card>
      <Space direction="vertical">
        <Typography.Text strong>{review.name}</Typography.Text>
        <Rate allowHalf disabled defaultValue={review.rating} />
        <Typography.Text type="secondary">{formattedDate}</Typography.Text>
        {review.comment && (
          <Typography.Paragraph>{review.comment}</Typography.Paragraph>
        )}
      </Space>
    </Card>
  );
};

export default ReviewItem;
