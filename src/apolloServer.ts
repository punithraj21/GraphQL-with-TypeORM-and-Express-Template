import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./schema/resolvers";

export const createApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cache: "bounded",
  });

  await server.start();
  return server;
};
