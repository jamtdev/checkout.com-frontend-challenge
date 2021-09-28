import { Card, Alert } from 'antd';
import { blue } from '@ant-design/colors';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { Review } from '../apollo/schema';

interface Props {
  reviews: Review[];
}

const categories = [1, 2, 3, 4, 5];

const formatXAxisTick = (tick: string) => `${tick} star`;

/**
 * Returns the total number of a specific rating in a product's reviews.
 */
export const getRatingsCount = (rating: number, reviews: Review[]) => {
  const ratingsCount = reviews.reduce((count, curr) => {
    if (curr.rating === rating) return count + 1;

    return count;
  }, 0);

  return ratingsCount;
};

/**
 * Renders a chart displaying the total number of each rating a product has received.
 */
const RatingsChart = ({ reviews }: Props) => {
  if (reviews.length === 0)
    return (
      <Alert message="There are no ratings for this product yet." type="info" />
    );

  const data = categories.map((category) => {
    return { category, count: getRatingsCount(category, reviews) };
  });

  return (
    <Card>
      <ResponsiveContainer
        /* Responsive fix from: https://github.com/recharts/recharts/issues/172 */
        width="99%"
        aspect={3}
      >
        <BarChart data={data}>
          <XAxis dataKey="category" tickFormatter={formatXAxisTick} />
          <YAxis
            dataKey="count"
            allowDecimals={false}
            label={{ value: 'Number of reviews', angle: -90 }}
          />
          <CartesianGrid vertical={false} />
          <Bar dataKey="count" fill={blue.primary} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default RatingsChart;
