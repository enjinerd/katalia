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
  mutation MyMutation($email: String!, $username: String!) {
    insert_katalia_user(objects: { email: $email, username: $username }) {
      returning {
        username
        email
      }
    }
  }
`;

export const GET_SPESIFIC_USER = gql`
  query MyQuery($where: katalia_user_bool_exp! = {}) {
    katalia_user(where: $where) {
      email
      id
      username
    }
  }
`;
