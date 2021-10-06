import { gql } from '@apollo/client';

export const GET_ALL_DATA = gql`
  query MyQuery($limit: Int = 8, $offset: Int = 0) {
    katalia_snippet(limit: $limit, offset: $offset) {
      id
      title
      username
      upcount
    }
  }
`;

export const DATA_LENGTH = gql`
  query MyQuery {
    katalia_snippet_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_SPECIFIC_DATA = gql`
  query MyQuery($id: String!) {
    katalia_snippet_by_pk(id: $id) {
      Snip_REL_aggregate {
        nodes {
          email
        }
      }
      username
      title
      snippet
      upcount
    }
  }
`;

export const GET_USER_SNIPPET_DATA = gql`
  query MyQuery($where: katalia_snippet_bool_exp! = {}) {
    katalia_snippet(where: $where) {
      id
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

export const ADD_SNIPPET = gql`
  mutation MyMutation(
    $desc: String = ""
    $id: String!
    $snippet: String!
    $title: String!
    $username: String!
  ) {
    insert_katalia_snippet_one(
      object: {
        snippet: $snippet
        username: $username
        title: $title
        desc: $desc
        id: $id
      }
    ) {
      title
    }
  }
`;

export const UPDATE_USERNAME = gql`
  mutation MyMutation($prevUsername: String!, $usernameUpdate: String!) {
    update_katalia_user_by_pk(
      pk_columns: { username: $prevUsername }
      _set: { username: $usernameUpdate }
    ) {
      username
    }
  }
`;

export const UPDATE_SNIPPET = gql`
  mutation MyMutation(
    $id: String!
    $updatedSnippet: String = ""
    $updatedTitle: String = ""
  ) {
    update_katalia_snippet_by_pk(
      pk_columns: { id: $id }
      _set: { snippet: $updatedSnippet, title: $updatedTitle }
    ) {
      snippet
      title
    }
  }
`;

export const DELETE_SNIPPET = gql`
  mutation MyMutation($id: String!) {
    delete_katalia_snippet_by_pk(id: $id) {
      title
    }
  }
`;

export const UPDATE_UPCOUNT_SNIPPET = gql`
  mutation MyMutation($id: String!, $upcount: Int!) {
    update_katalia_snippet_by_pk(
      pk_columns: { id: $id }
      _set: {}
      _inc: { upcount: $upcount }
    ) {
      id
      upcount
    }
  }
`;
