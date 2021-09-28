import { Resolvers } from '@apollo/client';
import { v4 as uuid } from 'uuid';
import { connectToDb } from './db';
import Product from '../models/Product';
import Review from '../models/Review';

export const resolvers: Resolvers = {
  Query: {
    /**
     * Returns a specific product using `productId`.
     */
    getProductById: async (_, { productId }) => {
      await connectToDb();

      const productDoc = await Product.findOne({ productId });

      const product = productDoc.toObject();

      return product;
    },
    /**
     * Returns all products.
     */
    getProducts: async () => {
      await connectToDb();

      const productDocs = await Product.find({});

      const products = productDocs.map((product) => product.toObject());

      return products;
    },
  },
  Product: {
    /**
     * Returns the reviews for a given product using `productId`.
     */
    reviews: async (parent) => {
      await connectToDb();

      const reviewDocs = await Review.find({ productId: parent.productId });

      const reviews = reviewDocs.map((review) => review.toObject());

      const sortedReviews = reviews.sort((a, b) => b.created - a.created);

      return sortedReviews;
    },
  },
  Mutation: {
    /**
     * Inserts a review into MongoDB and returns it.
     */
    submitReview: async (_, { productId, review }) => {
      await connectToDb();

      const reviewId = uuid();

      const submittedReview = {
        reviewId,
        productId,
        ...review,
      };

      await Review.create(submittedReview);

      return submittedReview;
    },
  },
};
