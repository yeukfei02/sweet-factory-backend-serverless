import { GraphQLClient, gql } from 'graphql-request';
import faker from 'faker';

const rootUrl = 'https://ccvwi4h6vk.execute-api.ap-southeast-1.amazonaws.com/prod';
const graphQLClient = new GraphQLClient(rootUrl);

const randomText = faker.random.word();

export const cityTest = (): void => {
  describe('city test', () => {
    test('createCity', async () => {
      const token = await getToken();
      const zoneId = await getZoneId();
      const userId = await getUserId();

      const CREATE_CITY = gql`
        mutation createCities($input: CreateCitiesInput!) {
          createCities(input: $input) {
            message
          }
        }
      `;
      const variables = {
        input: {
          city_name: randomText,
          area: randomText,
          zone_id: zoneId,
          user_id: userId,
        },
      };
      const headers = {
        authorization: `Bearer ${token}`,
      };
      const response = await graphQLClient.request(CREATE_CITY, variables, headers);
      console.log('response = ', response);

      expect(response).toBeDefined();
      expect(response.createCities).toBeDefined();
      expect(response.createCities.message).toBeDefined();
    });

    test('getCities', async () => {
      const token = await getToken();
      const userId = await getUserId();

      const GET_CITIES = gql`
        query getCities {
          getCities {
            message
            cities {
              id
              city_name
              area
              created_at
              updated_at
              zone {
                id
                zone_name
                created_at
                updated_at
              }
            }
          }
        }
      `;
      const variables = { user_id: userId };
      const headers = {
        authorization: `Bearer ${token}`,
      };
      const response = await graphQLClient.request(GET_CITIES, variables, headers);
      console.log('response = ', response);

      expect(response).toBeDefined();
      expect(response.getCities).toBeDefined();
      expect(response.getCities.message).toBeDefined();
      expect(response.getCities.cities).toBeDefined();
    });

    test('getCityById', async () => {
      const token = await getToken();
      const cityId = await getCityId();

      const GET_CITY_BY_ID = gql`
        query getCityById($id: Int) {
          getCityById(id: $id) {
            message
            city {
              id
              city_name
              area
              created_at
              updated_at
              zone {
                id
                zone_name
                created_at
                updated_at
              }
            }
          }
        }
      `;
      const variables = { id: cityId };
      const headers = {
        authorization: `Bearer ${token}`,
      };
      const response = await graphQLClient.request(GET_CITY_BY_ID, variables, headers);
      console.log('response = ', response);

      expect(response).toBeDefined();
      expect(response.getCityById).toBeDefined();
      expect(response.getCityById.message).toBeDefined();
      expect(response.getCityById.city).toBeDefined();
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
      email: 'test@email.com',
      password: 'test',
    },
  };
  const response = await graphQLClient.request(LOGIN, variables);
  console.log('response = ', response);

  const userId = response.login.user_id;
  return userId;
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

async function getCityId() {
  const token = await getToken();

  const GET_CITIES = gql`
    query getCities {
      getCities {
        message
        cities {
          id
          city_name
          area
          created_at
          updated_at
          zone {
            id
            zone_name
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
  const response = await graphQLClient.request(GET_CITIES, {}, headers);
  console.log('response = ', response);

  const cityId = response.getCities.cities[0].id;
  return cityId;
}
