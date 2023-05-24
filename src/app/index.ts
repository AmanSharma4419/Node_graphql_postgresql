import bodyParser from "body-parser";

const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");

export async function initServer() {
  const app = express();
  app.use(bodyParser.json());
  const graphqlServer = new ApolloServer({
    typeDefs: `type Query {
          sayHello:String
    }
    `,
    resolvers: {
      Query: {
        sayHello: () => `Hello from server`,
      },
    },
  });

  await graphqlServer.start();
  app.use("/graphql", expressMiddleware(graphqlServer));
  return app;
}
