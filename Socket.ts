import { Server as SocketIOServer } from "socket.io";
import { Socket } from "socket.io-client";

export function setupSocketIOClient(ioClient: any) {
  const server1Socket = ioClient("http://localhost:3000");

  server1Socket.on("connect", () => {
    console.log("Connected to Server 1");
    server1Socket.emit("customEvent", "Hello from Server 2 upon connection");
  });

  server1Socket.on("connect_error", (err) => {
    console.log("Connection Error:", err);
  });

  server1Socket.on("disconnect", () => {
    console.log("Disconnected from Server 1");
  });

  let count = 0;
  server1Socket.on("messageFromServer1", (message: string) => {
    console.log("message: ", message);
    setTimeout(() => {
      server1Socket.emit("customEvent", `Hello fromGraphQL ${count}`);
      count++;
    }, 3000);
  });

  return server1Socket;
}

export function setupSocketIOServer(io: SocketIOServer) {
  io.on("connection", (socket) => {
    console.log("Client connected to Server 2");

    socket.on("messageToServer1", (message) => {
      //   console.log("Sending message to Server 1:", message);
      //   io.emit("messageFromServer2", message);
    });
  });
}
