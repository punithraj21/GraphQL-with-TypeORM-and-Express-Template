import myQueue from "./bullmq-config";

export const addJob = async () => {
  try {
    await myQueue.add("myJob", {
      foo: "bar",
    });
    console.log("Job added successfully");
  } catch (error) {
    console.error("Error adding job:", error);
  }
};

addJob().catch((error) => console.error("Error adding job:", error));
