// import env from 'dotenv';
// env.config();

import { ApolloServer } from 'apollo-server-lambda';
import typeDefs from '../../schema/typeDefs';
import resolvers from '../../resolvers/resolvers';

import awsXRay from 'aws-xray-sdk';
import awsSdk from 'aws-sdk';
if (process.env._X_AMZN_TRACE_ID) {
  awsXRay.captureAWS(awsSdk);
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: true,
  introspection: true,
  playground: {
    endpoint: '/prod',
  },
  context: ({ event, context }) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const token =
      event.headers && event.headers.Authorization ? event.headers.Authorization.replace('Bearer ', '') : '';

    const data = {
      event: event,
      context: context,
      token: token,
    };
    return data;
  },
});

export const graphqlHandler = server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  },
});
