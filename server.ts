// src/index.ts
import "reflect-metadata";
import express from "express";
import { createApolloServer } from "./src/apolloServer";
import { databaseInit } from "./src/bootstrap";

const app = express();

(async () => {
  try {
    await databaseInit();

    const server = await createApolloServer();
    server.applyMiddleware({ app });

    app.listen(4000, () => {
      console.log("Server running at http://localhost:4000/graphql");
    });
  } catch (error) {
    console.error("Failed to initialize Server:", error);
  }
})();
