import { ApolloServer } from 'apollo-server';
import { schema } from '../api/schema';

import { createTestClient } from 'apollo-server-testing';

const server = new ApolloServer({
  schema,
});
const { query } = createTestClient(server);

export const userTest = (): void => {
  describe('user test', () => {
    test('getUsers test', async () => {
      const GET_USERS = `
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
      const response = await query({ query: GET_USERS, variables: {} });
      console.log('response = ', response);

      expect(response.data).toBeDefined();
      expect(response.data.getUsers).toBeDefined();
      expect(response.data.getUsers.message).toBeDefined();
      expect(response.data.getUsers.users).toBeDefined();
      expect(response.errors).toBeUndefined();
    });
  });
};
