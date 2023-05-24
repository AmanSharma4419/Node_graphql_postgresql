import bodyParser from "body-parser";
import { User } from "./user";
const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");

export async function initServer() {
  const app = express();
  app.use(bodyParser.json());
  const graphqlServer = new ApolloServer({
    typeDefs: `
    ${User.types}
    type Query {
      ${User.queries}
    }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
    },
  });

  await graphqlServer.start();
  app.use("/graphql", expressMiddleware(graphqlServer));
  return app;
}
