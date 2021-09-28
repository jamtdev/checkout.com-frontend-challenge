# [Checkout.com](https://www.checkout.com) Frontend Challenge

[![Pipeline Status](https://gitlab.com/JamT/checkout-com-frontend-challenge/badges/main/pipeline.svg)](https://gitlab.com/JamT/checkout-com-frontend-challenge/badges/main/pipeline.svg)

## Overview

This project is composed of a web app built with [Next.js](https://nextjs.org/), [Apollo Client](https://www.apollographql.com/apollo-client) and [Ant Design](https://ant.design/), and a GraphQL API built with [Next.js](https://nextjs.org/docs/api-routes/introduction), [Apollo Server](https://https://www.apollographql.com/docs/apollo-server/) and [MongoDB](https://www.mongodb.com/).

## System requirements

- [Node.js 12.0](https://nodejs.org/en/) or later

## Getting started

To run this project you will need to create a `.env.local` file in the project root with a `MONGODB_URI` variable containing your MongoDB connection string.

```bash
MONGODB_URI=<connection_string>
```

To run locally, run:

```bash
yarn dev
```

The project will start serving at http://localhost:3000.

The project can be built and started by running:

```bash
yarn build & yarn start
```

To run the project's test suite, run:

```bash
yarn test
```

_To run the Cypress E2E tests requires the project to be serving locally. Running `yarn dev` in a separate terminal window will suffice._

## Deployment

The project's default branch is `main` (protected).

Commits to the repository trigger a GitLab pipeline which runs the project's test suite. Commits are automatically deployed to preview environments.

Pull requests can only be merged into `main` after a successful build. Merge changes to `main` are automatically deployed to production.
