const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    posts: [Post]
  }
  
  type Topic {
    _id: ID!
    name: String!
    posts: [Post]!
  }

  type Post {
    _id: ID!
    author: User
    topic: Topic
    question: String!
    content: String!
    comments: [Comment]
  }

  type Comment {
    _id: ID!
    author: User
    content: String!
    upvotes: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  
  type Query {
    me: User!
    getTopicByName(name: String!): Topic!
    getTopics: [Topic]!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    removeComment(commentId: ID!, postId: ID!): Post
    createComment(content: String!, author: ID!, upvotes: Int, postId: ID!): Comment
    createPost(question: String!,content: String!, author: ID!, topic: ID!): Post
  }
  `;
  // addComment(commentData: CommentInput!): Post
module.exports = typeDefs;
