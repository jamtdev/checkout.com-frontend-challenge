import { ApolloServer } from 'apollo-server-micro';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { ServerResponse } from 'http';
import { schema } from '../../apollo/schema';

export const config = {
  api: {
    bodyParser: false,
  },
};

const apolloServer = new ApolloServer({ schema });

const startServer = apolloServer.start();

/**
 * Handler function to await the start of the Apollo Server instance between making requests.
 */
export default async function handler(req: MicroRequest, res: ServerResponse) {
  await startServer;

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
}
