import { gql } from '@apollo/client';

export const GET_ME = gql`
    {
        me {
            _id
            username
            email
        }
    }
`;

export const GET_TOPICS = gql`
    query getTopics{
        getTopics {
            _id
            name
        }
    }
`;

export const GET_TOPIC_BY_NAME = gql`
query getTopicByName($name: String!) {
    getTopicByName(name: $name) {
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