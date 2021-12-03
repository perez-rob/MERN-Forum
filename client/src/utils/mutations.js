import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;


export const REMOVE_COMMENT = gql`
mutation removeComment($commentId: ID!, $postId: ID!) {
  removeComment(commentId: $commentId, postId: $postId) {
      _id
      content
      author {
        _id
      }
      upvotes
  }
}
`;

export const CREATE_COMMENT = gql`
  mutation createComment($content: String!, $author: ID!, $upvotes: Int!, $postId: ID!) {
    createComment(content: $content, author: $author, upvotes: $upvotes, postId: $postId) {
        _id
        content
        author {
          _id
        }
        upvotes
    }
  }
`;

export const REMOVE_POST = gql`
  mutation removePost($postId: ID!, $topicId: ID!) {
    removePost(postId: $postId, topicId: $topicId) {
        _id
        name
        posts {
            _id
            question
            content
            author {
                _id
                username
            }
            comments {
                content
                author {
                    _id
                    username
                }
                upvotes
            }
        }
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($question: String!, $content: String!, $author: ID!, $topic: ID!) {
    createPost(question: $question, content: $content, author: $author, topic: $topic) {
      _id
      question
      content
      author {
        _id
      }
      topic {
        _id
      }
    }
  }
`;
