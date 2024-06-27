import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export const resolvers: any = {
  Query: {
    users: async () => {
      const userRepository = AppDataSource.getRepository(User);
      return await userRepository.find();
    },
    getUsers: async () => {
      const users = await fetch("http://localhost:3000/users");
      return await users.json();
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

    createPost: async (_, { title, content, userId }) => {
      const response = await fetch("http://localhost:3000/createPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, userId }),
      });

      const postResponse = await response.json();

      return postResponse.data;
    },
  },
};
