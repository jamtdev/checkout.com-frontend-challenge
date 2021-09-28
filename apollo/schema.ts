import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

export type Review = {
  reviewId: string;
  productId: string;
  name: string;
  email: string;
  created: number;
  rating: number;
  comment?: string;
};

export type Product = {
  productId: string;
  name: string;
  description: string;
  price: number;
  reviews: Review[];
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
