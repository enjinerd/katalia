import { gql } from '@apollo/client';

export const GET_ALL_DATA = gql`
  query MyQuery {
    katalia_snippet {
      id
      snippet
      title
      username
    }
  }
`;
export const GET_SPECIFIC_DATA = gql`
  query MyQuery($id: String!) {
    katalia_snippet(where: { id: { _eq: $id } }) {
      desc
      snippet
      title
      username
    }
  }
`;

export const REGISTER_USER = gql`
  mutation MyMutation($username: String!) {
    insert_katalia_user(objects: { username: $username }) {
      returning {
        username
      }
    }
  }
`;
