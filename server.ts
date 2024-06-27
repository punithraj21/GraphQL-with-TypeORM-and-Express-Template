import express from "express";
import { ApolloServer } from "apollo-server-express";
import { AppDataSource } from "./src/data-source";
import { databaseInit } from "./src/bootstrap";
import { User } from "./src/entity/User";

const app = express();

const typeDefs: any = `
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    age: Int!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, age: Int!): User
  }
`;

const resolvers: any = {
  Query: {
    users: async () => {
      const userRepository = AppDataSource.getRepository(User);
      return await userRepository.find();
    },
  },
  Mutation: {
    createUser: async (_, { firstName, lastName, age }) => {
      const userRepository = AppDataSource.getRepository(User);
      const user = new User();
      user.firstName = firstName;
      user.lastName = lastName;
      user.age = age;
      return await userRepository.save(user);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers, cache: "bounded" });

(async () => {
  try {
    await databaseInit();
    await server.start();
    server.applyMiddleware({ app });

    app.listen(4000, () => {
      console.log("Apollo Server running at http://localhost:4000/graphql");
    });
  } catch (error) {
    console.error("Failed to initialize DataSource:", error);
  }
})();
