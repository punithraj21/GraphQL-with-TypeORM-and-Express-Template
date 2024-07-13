import "reflect-metadata";
import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { io as ioClient } from "socket.io-client";
import { createApolloServer } from "./src/apolloServer";
import { databaseInit } from "./src/bootstrap";
import { setupSocketIOClient, setupSocketIOServer } from "./Socket";

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);

(async () => {
  try {
    // Initialize the database
    await databaseInit();

    // Create and apply Apollo Server middleware
    const apolloServer = await createApolloServer();
    apolloServer.applyMiddleware({ app });

    // Setup Socket.IO client and server
    setupSocketIOClient(ioClient);
    // setupSocketIOServer(io);

    // Start the HTTP server
    server.listen(4000, () => {
      console.log("Server running at http://localhost:4000/graphql");
    });
  } catch (error) {
    console.error("Failed to initialize server:", error);
  }
})();
