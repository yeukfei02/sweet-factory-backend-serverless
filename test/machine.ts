import { GraphQLClient, gql } from 'graphql-request';
import faker from 'faker';

const rootUrl = 'https://ccvwi4h6vk.execute-api.ap-southeast-1.amazonaws.com/prod';
const graphQLClient = new GraphQLClient(rootUrl);

const randomText = faker.random.word();
const randomNumber = faker.datatype.number();

export const machineTest = (): void => {
  describe('machine test', () => {
    test('createMachine', async () => {
      const token = await getToken();
      const cityId = await getCityId();

      const CREATE_MACHINES = gql`
        mutation createMachines($input: CreateMachinesInput!) {
          createMachines(input: $input) {
            message
          }
        }
      `;
      const variables = {
        input: {
          machine_name: randomText,
          serial_number: randomNumber,
          city_id: cityId,
        },
      };
      const headers = {
        authorization: `Bearer ${token}`,
      };
      const response = await graphQLClient.request(CREATE_MACHINES, variables, headers);
      console.log('response = ', response);

      expect(response).toBeDefined();
      expect(response.createMachines).toBeDefined();
      expect(response.createMachines.message).toBeDefined();
    });

    test('getMachines', async () => {
      const token = await getToken();

      const GET_MACHINES = gql`
        query getMachines {
          getMachines {
            message
            machines {
              id
              machine_name
              serial_number
              created_at
              updated_at
              city {
                id
                city_name
                area
                created_at
                updated_at
              }
              products {
                id
                product_name
                product_description
                price
                quantity
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
      const response = await graphQLClient.request(GET_MACHINES, {}, headers);
      console.log('response = ', response);

      expect(response).toBeDefined();
      expect(response.getMachines).toBeDefined();
      expect(response.getMachines.message).toBeDefined();
      expect(response.getMachines.machines).toBeDefined();
    });

    test('getMachineById', async () => {
      const token = await getToken();
      const machineId = await getMachineId();

      const GET_MACHINE_BY_ID = gql`
        query getMachineById($id: Int) {
          getMachineById(id: $id) {
            message
            machine {
              id
              machine_name
              serial_number
              created_at
              updated_at
              city {
                id
                city_name
                area
                created_at
                updated_at
              }
              products {
                id
                product_name
                product_description
                price
                quantity
                created_at
                updated_at
              }
            }
          }
        }
      `;
      const variables = { id: machineId };
      const headers = {
        authorization: `Bearer ${token}`,
      };
      const response = await graphQLClient.request(GET_MACHINE_BY_ID, variables, headers);
      console.log('response = ', response);

      expect(response).toBeDefined();
      expect(response.getMachineById).toBeDefined();
      expect(response.getMachineById.message).toBeDefined();
      expect(response.getMachineById.machine).toBeDefined();
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

async function getMachineId() {
  const token = await getToken();

  const GET_MACHINES = gql`
    query getMachines {
      getMachines {
        message
        machines {
          id
          machine_name
          serial_number
          created_at
          updated_at
          city {
            id
            city_name
            area
            created_at
            updated_at
          }
          products {
            id
            product_name
            product_description
            price
            quantity
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
  const response = await graphQLClient.request(GET_MACHINES, {}, headers);
  console.log('response = ', response);

  const machineId = response.getMachines.machines[0].id;
  return machineId;
}
