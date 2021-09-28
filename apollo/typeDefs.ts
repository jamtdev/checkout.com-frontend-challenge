import { gql } from '@apollo/client';

export const typeDefs = gql`
  type Product {
    productId: ID!
    name: String!
    description: String!
    price: Float!
    reviews: [Review]!
  }

  type Review {
    reviewId: ID!
    productId: ID!
    name: String!
    email: String!
    created: Float!
    rating: Float!
    comment: String
  }

  input ReviewInput {
    name: String!
    email: String!
    created: Float!
    rating: Float!
    comment: String
  }

  type Query {
    getProducts: [Product!]!
    getProductById(productId: ID!): Product!
  }

  type Mutation {
    submitReview(productId: ID!, review: ReviewInput!): Review!
  }
`;
