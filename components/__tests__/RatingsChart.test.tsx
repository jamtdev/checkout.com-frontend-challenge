import { Review } from '../../apollo/schema';
import { getRatingsCount } from '../RatingsChart';

const mockReviews = [
  { rating: 1 },
  { rating: 1 },
  { rating: 1 },
  { rating: 2 },
  { rating: 2 },
  { rating: 2 },
  { rating: 2 },
  { rating: 3 },
  { rating: 3 },
  { rating: 4 },
  { rating: 4 },
  { rating: 4 },
  { rating: 4 },
  { rating: 4 },
  { rating: 5 },
];

describe('RatingsChart', () => {
  describe('getRatingsCount', () => {
    const testCases = [
      [1, 3],
      [2, 4],
      [3, 2],
      [4, 5],
      [5, 1],
    ];

    test.each(testCases)(
      'given the rating %d, returns a count of %d',
      (rating, count) => {
        expect(getRatingsCount(rating, mockReviews as Review[])).toEqual(count);
      }
    );
  });
});
