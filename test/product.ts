import { GraphQLClient, gql } from 'graphql-request';
import faker from 'faker';

const rootUrl = 'https://ccvwi4h6vk.execute-api.ap-southeast-1.amazonaws.com/prod';
const graphQLClient = new GraphQLClient(rootUrl);

const randomText = faker.random.word();

export const productTest = (): void => {
  describe('product test', () => {
    test('createProduct', async () => {
      const token = await getToken();
      const machineId = await getMachineId();
      const cityId = await getCityId();
      const userId = await getUserId();

      const CREATE_PRODUCTS = gql`
        mutation createProducts($input: CreateProductsInput!) {
          createProducts(input: $input) {
            message
          }
        }
      `;
      const variables = {
        input: {
          product_name: randomText,
          product_description: randomText,
          price: faker.datatype.number(),
          quantity: faker.datatype.number(),
          machine_id: machineId,
          city_id: cityId,
          user_id: userId,
        },
      };
      const headers = {
        authorization: `Bearer ${token}`,
      };
      const response = await graphQLClient.request(CREATE_PRODUCTS, variables, headers);
      console.log('response = ', response);

      expect(response).toBeDefined();
      expect(response.createProducts).toBeDefined();
      expect(response.createProducts.message).toBeDefined();
    });

    test('getProducts', async () => {
      const token = await getToken();
      const userId = await getUserId();

      const GET_PRODUCTS = gql`
        query getProducts {
          getProducts {
            message
            products {
              id
              product_name
              product_description
              price
              quantity
              created_at
              updated_at
              machine {
                id
                machine_name
                serial_number
                created_at
                updated_at
              }
              city {
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
      const variables = { user_id: userId };
      const headers = {
        authorization: `Bearer ${token}`,
      };
      const response = await graphQLClient.request(GET_PRODUCTS, variables, headers);
      console.log('response = ', response);

      expect(response).toBeDefined();
      expect(response.getProducts).toBeDefined();
      expect(response.getProducts.message).toBeDefined();
      expect(response.getProducts.products).toBeDefined();
    });

    test('getProductById', async () => {
      const token = await getToken();
      const productId = await getProductId();

      const GET_PRODUCT_BY_ID = gql`
        query getProductById($id: Int) {
          getProductById(id: $id) {
            message
            product {
              id
              product_name
              product_description
              price
              quantity
              created_at
              updated_at
              machine {
                id
                machine_name
                serial_number
                created_at
                updated_at
              }
              city {
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
      const variables = { id: productId };
      const headers = {
        authorization: `Bearer ${token}`,
      };
      const response = await graphQLClient.request(GET_PRODUCT_BY_ID, variables, headers);
      console.log('response = ', response);

      expect(response).toBeDefined();
      expect(response.getProductById).toBeDefined();
      expect(response.getProductById.message).toBeDefined();
      expect(response.getProductById.product).toBeDefined();
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

async function getProductId() {
  const token = await getToken();

  const GET_PRODUCTS = gql`
    query getProducts {
      getProducts {
        message
        products {
          id
          product_name
          product_description
          price
          quantity
          created_at
          updated_at
          machine {
            id
            machine_name
            serial_number
            created_at
            updated_at
          }
          city {
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
  const response = await graphQLClient.request(GET_PRODUCTS, {}, headers);
  console.log('response = ', response);

  const productId = response.getProducts.products[0].id;
  return productId;
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
