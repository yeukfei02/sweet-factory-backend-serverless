import { GraphQLClient, gql } from 'graphql-request';
import faker from 'faker';

const rootUrl = 'https://ccvwi4h6vk.execute-api.ap-southeast-1.amazonaws.com/prod';
const graphQLClient = new GraphQLClient(rootUrl);

const email = faker.internet.email();
const password = 'test';

export const userTest = (): void => {
  describe('user test', () => {
    test('signup', async () => {
      const SIGNUP = gql`
        mutation signup($input: SignupInput!) {
          signup(input: $input) {
            message
          }
        }
      `;
      const variables = {
        input: {
          email: email,
          password: password,
        },
      };
      const response = await graphQLClient.request(SIGNUP, variables);
      console.log('response = ', response);

      expect(response).toBeDefined();
      expect(response.signup).toBeDefined();
      expect(response.signup.message).toBeDefined();
    });

    test('login', async () => {
      const LOGIN = gql`
        mutation login($input: LoginInput!) {
          login(input: $input) {
            message
            token
            user_id
          }
        }
      `;
      const variables = {
        input: {
          email: email,
          password: password,
        },
      };
      const response = await graphQLClient.request(LOGIN, variables);
      console.log('response = ', response);

      expect(response).toBeDefined();
      expect(response.login).toBeDefined();
      expect(response.login.message).toBeDefined();
    });

    test('getUsers', async () => {
      const GET_USERS = gql`
        query getUsers {
          getUsers {
            message
            users {
              id
              email
              password
              created_at
              updated_at
            }
          }
        }
      `;
      const response = await graphQLClient.request(GET_USERS);
      console.log('response = ', response);

      expect(response).toBeDefined();
      expect(response.getUsers).toBeDefined();
      expect(response.getUsers.message).toBeDefined();
      expect(response.getUsers.users).toBeDefined();
    });

    test('getUserById', async () => {
      const userId = await getUserId();

      const GET_USER_BY_ID = gql`
        query getUserById($id: Int) {
          getUserById(id: $id) {
            message
            user {
              id
              email
              password
              created_at
              updated_at
            }
          }
        }
      `;
      const variables = { id: userId };
      const response = await graphQLClient.request(GET_USER_BY_ID, variables);
      console.log('response = ', response);

      expect(response).toBeDefined();
      expect(response.getUserById).toBeDefined();
      expect(response.getUserById.message).toBeDefined();
      expect(response.getUserById.user).toBeDefined();
    });
  });
};

async function getUserId() {
  const LOGIN = gql`
    mutation login($input: LoginInput!) {
      login(input: $input) {
        message
        token
        user_id
      }
    }
  `;
  const variables = {
    input: {
      email: email,
      password: password,
    },
  };
  const response = await graphQLClient.request(LOGIN, variables);
  console.log('response = ', response);

  const userId = response.login.user_id;
  return userId;
}
