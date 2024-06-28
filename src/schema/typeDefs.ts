import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    age: Int!
    profile: Profile
    posts: [Post]
  }

  type Profile {
    id: Int!
    bio: String!
    avatar: String!
  }

  type Post {
    id: Int!
    title: String!
    content: String!
    categories: [Category]
  }

  type updateUser {
    id: Int!
    firstName: String!
    lastName: String!
    age: Int!
  }

  type PostResponse {
    id: Int!
    firstName: String!
    lastName: String!
    age: Int!
    profile: Profile
    posts: [Post]
  }

  type Category {
    id: Int!
    name: String!
  }

  type Query {
    users: [User]
    getUsers: [User]
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, age: Int!): User
    createPost(title: String!, content: String!, userId: Int!): PostResponse
    updateUser(firstName: String, lastName: String, age: Int): updateUser
  }
`;
