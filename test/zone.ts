import { GraphQLClient, gql } from 'graphql-request';
import faker from 'faker';

const rootUrl = 'https://ccvwi4h6vk.execute-api.ap-southeast-1.amazonaws.com/prod';
const graphQLClient = new GraphQLClient(rootUrl);

const randomText = faker.random.word();

export const zoneTest = (): void => {
  describe('user test', () => {
    test('createZone', async () => {
      const token = await getToken();

      const CREATE_ZONE = gql`
        mutation createZones($input: CreateZonesInput!) {
          createZones(input: $input) {
            message
          }
        }
      `;
      const variables = {
        input: {
          zone_name: randomText,
        },
      };
      const headers = {
        authorization: `Bearer ${token}`,
      };
      const response = await graphQLClient.request(CREATE_ZONE, variables, headers);
      console.log('response = ', response);

      expect(response).toBeDefined();
      expect(response.createZones).toBeDefined();
      expect(response.createZones.message).toBeDefined();
    });

    test('getZones', async () => {
      const token = await getToken();

      const GET_ZONES = gql`
        query getZones {
          getZones {
            message
            zones {
              id
              zone_name
              created_at
              updated_at
              cities {
                id
                city_name
                area
                created_at
                updated_at
              }
            }
          }
        }
      `;
      const headers = {
        authorization: `Bearer ${token}`,
      };
      const response = await graphQLClient.request(GET_ZONES, {}, headers);
      console.log('response = ', response);

      expect(response).toBeDefined();
      expect(response.getZones).toBeDefined();
      expect(response.getZones.message).toBeDefined();
      expect(response.getZones.zones).toBeDefined();
    });

    test('getZoneById', async () => {
      const token = await getToken();
      const zoneId = await getZoneId();

      const GET_ZONE_BY_ID = gql`
        query getZoneById($id: Int) {
          getZoneById(id: $id) {
            message
            zone {
              id
              zone_name
              created_at
              updated_at
              cities {
                id
                city_name
                area
                created_at
                updated_at
              }
            }
          }
        }
      `;
      const variables = { id: zoneId };
      const headers = {
        authorization: `Bearer ${token}`,
      };
      const response = await graphQLClient.request(GET_ZONE_BY_ID, variables, headers);
      console.log('response = ', response);

      expect(response).toBeDefined();
      expect(response.getZoneById).toBeDefined();
      expect(response.getZoneById.message).toBeDefined();
      expect(response.getZoneById.zone).toBeDefined();
    });
  });
};

async function getToken() {
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
      email: 'yeukfei02@gmail.com',
      password: 'test',
    },
  };
  const response = await graphQLClient.request(LOGIN, variables);
  console.log('response = ', response);

  const token = response.login.token;
  return token;
}

async function getZoneId() {
  const token = await getToken();

  const GET_ZONES = gql`
    query getZones {
      getZones {
        message
        zones {
          id
          zone_name
          created_at
          updated_at
          cities {
            id
            city_name
            area
            created_at
            updated_at
          }
        }
      }
    }
  `;
  const headers = {
    authorization: `Bearer ${token}`,
  };
  const response = await graphQLClient.request(GET_ZONES, {}, headers);
  console.log('response = ', response);

  const zoneId = response.getZones.zones[0].id;
  return zoneId;
}
