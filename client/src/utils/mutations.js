import gql from 'graphql-tag';

// login a user and receive the token, id and user name.
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

// create an user and receive the token,id and user name
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

// add friend, will be used fromm the profile page.
export const ADD_FRIEND = gql`
  mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;