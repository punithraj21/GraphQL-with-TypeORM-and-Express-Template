import amqp from "amqplib";

const queue = "companyDetails";
const rabbitmqUrl = "amqp://guest:guest@localhost:5672";

export const publishMessage = async (message: any) => {
  try {
    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, {
      durable: true,
    });

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error("Error publishing message:", error);
  }
};
