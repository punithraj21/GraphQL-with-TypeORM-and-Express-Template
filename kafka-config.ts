import { Kafka, CompressionTypes } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const topic = "companyDetails";

export const publishToKafka = async (message: any) => {
  try {
    await producer.connect();

    await producer.send({
      topic: topic,
      compression: CompressionTypes.GZIP,
      messages: [{ value: JSON.stringify(message) }],
    });

    setTimeout(async () => {
      await producer.disconnect();
    }, 500);
  } catch (error) {
    console.error("Error publishing message:", error);
  }
};
