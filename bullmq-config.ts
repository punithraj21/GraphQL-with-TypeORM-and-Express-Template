import { Queue } from "bullmq";

const connection = {
  host: "127.0.0.1",
  port: 6379,
};

const userDetails = new Queue("userDetails", { connection });

userDetails.on("error", (error) => {
  console.error("Queue error:", error);
});

export default userDetails;
