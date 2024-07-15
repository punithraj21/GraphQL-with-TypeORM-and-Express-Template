# graphql-express-typeorm

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run server.ts
```

This project was created using `bun init` in bun v1.1.16. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

kafka installation
Start Zookeeper
docker run -d --name zookeeper -p 2181:2181 bitnami/zookeeper:latest

step 2: Start Kafka
docker run -d --name kafka -p 9092:9092 --link zookeeper:zookeeper -e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 -e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092 confluentinc/cp-kafka:latest

Step 3: Create a Kafka Topic
docker exec kafka kafka-topics.sh --create --topic companyDetails --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1

step 4
Create Kafka Topic
docker exec kafka kafka-topics --create --topic companyDetails --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1

To view a Kafka dashboard, you typically need to use a monitoring tool that provides a graphical interface to monitor Kafka metrics. There are several tools available for this purpose, such as Kafka Manager, Confluent Control Center, and Grafana combined with Prometheus. Below, I'll guide you through setting up Kafka Manager, a popular choice for managing and monitoring Kafka clusters.

Step 1: Install Kafka Manager using Docker
First, let's run Kafka Manager in a Docker container. Create a new network so Kafka Manager can communicate with your Kafka and Zookeeper containers:

docker network create kafka-network
docker network connect kafka-network zookeeper
docker network connect kafka-network kafka

Now, run Kafka Manager:
docker run -d --name=kafka-manager --network=kafka-network -p 9000:9000 -e ZK_HOSTS=zookeeper:2181 hlebalbau/kafka-manager

Open Kafka Manager in your web browser.
http://localhost:9000

Click on the "Cluster" drop-down menu in the top navigation bar.

Select "Add Cluster".

Fill out the form with your Kafka cluster details:

Cluster Name: A name for your Kafka cluster.
Cluster Zookeeper Hosts: zookeeper:2181
Kafka Version: Select the appropriate Kafka version.
Enable JMX Polling: (Optional) Enable if you want JMX metrics.
Click "Save" to add your Kafka cluster.

Dragonfly with bullmq setup
docker run -d --name dragonfly -p 6379:6379 docker.dragonflydb.io/dragonflydb/dragonfly:latest /usr/local/bin/dragonfly --default_lua_flags=allow-undeclared-keys,disable-atomicity

Run rabbit mq

# latest RabbitMQ 3.13

docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.13-management
