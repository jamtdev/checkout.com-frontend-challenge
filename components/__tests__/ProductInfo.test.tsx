import { Review } from '../../apollo/schema';
import { getAverageRating, getRatingColour } from '../ProductInfo';

describe('ProductInfo', () => {
  describe('getAverageRating', () => {
    const testCases = [
      [{ rating: 1 }, { rating: 5 }, 3],
      [{ rating: 3 }, { rating: 5 }, 4],
      [{ rating: 1 }, { rating: 2 }, 1.5],
      [{ rating: 4 }, { rating: 5 }, 4.5],
      [{ rating: 3 }, { rating: 3.5 }, 3.25],
      [{ rating: 2 }, { rating: 4.75 }, 3.375],
    ];

    test.each(testCases)(
      'given %o and %o, returns an average rating of %d',
      (a, b, result) => {
        expect(getAverageRating([a, b] as Review[])).toEqual(result);
      }
    );
  });

  describe('getRatingColour', () => {
    const testCases = [
      [0, 'blue'],
      [1, 'red'],
      [2, 'red'],
      [3, 'orange'],
      [4, 'green'],
      [5, 'green'],
    ];

    test.each(testCases)('given %d, returns %s', (rating, result) => {
      expect(getRatingColour(rating as number)).toEqual(result);
    });
  });
});
