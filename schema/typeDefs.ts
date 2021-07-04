import { gql } from 'apollo-server-lambda';

const typeDefs = gql`
  type Query {
    getUsers: GetUsersResult!
    getUserById(id: Int): GetUsersByIdResult!

    getZones: GetZonesResult!
    getZoneById(id: Int): GetZonesByIdResult!

    getCities: GetCitiesResult!
    getCityById(id: Int): GetCityByIdResult!

    getMachines: GetMachinesResult!
    getMachineById(id: Int): GetMachineByIdResult!

    getProducts: GetProductsResult!
    getProductById(id: Int): GetProductByIdResult!
  }

  type Mutation {
    signup(input: SignupInput!): SignupResult!
    login(input: LoginInput!): LoginResult!

    createZones(input: CreateZonesInput!): CreateZonesResult!
    createCities(input: CreateCitiesInput!): CreateCitiesResult!
    createMachines(input: CreateMachinesInput!): CreateMachinesResult!
    createProducts(input: CreateProductsInput!): CreateProductsResult!
  }

  type GetUsersResult {
    message: String!
    users: [Users]
  }

  type GetUsersByIdResult {
    message: String!
    user: Users
  }

  type GetZonesResult {
    message: String!
    zones: [Zones]
  }

  type GetZonesByIdResult {
    message: String!
    zone: Zones
  }

  type GetCitiesResult {
    message: String!
    cities: [Cities]
  }

  type GetCityByIdResult {
    message: String!
    city: Cities
  }

  type GetMachinesResult {
    message: String!
    machines: [Machines]
  }

  type GetMachineByIdResult {
    message: String!
    machine: Machines
  }

  type GetProductsResult {
    message: String!
    products: [Products]
  }

  type GetProductByIdResult {
    message: String!
    product: Products
  }

  type CreateZonesResult {
    message: String!
  }

  type CreateCitiesResult {
    message: String!
  }

  type CreateMachinesResult {
    message: String!
  }

  type CreateProductsResult {
    message: String!
  }

  type Users {
    id: Int
    email: String
    password: String
    created_at: String
    updated_at: String
  }

  type Zones {
    id: Int
    zone_name: String
    created_at: String
    updated_at: String
    cities: [Cities]
  }

  type Cities {
    id: Int
    city_name: String
    area: String
    created_at: String
    updated_at: String
    zone: Zones
  }

  type Machines {
    id: Int
    machine_name: String
    serial_number: Int
    created_at: String
    updated_at: String
    city: Cities
    products: [Products]
  }

  type Products {
    id: Int
    product_name: String
    product_description: String
    price: Float
    quantity: Int
    created_at: String
    updated_at: String
    machine: Machines
    city: Cities
  }

  type SignupResult {
    message: String!
  }

  type LoginResult {
    message: String!
    token: String
  }

  input SignupInput {
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input CreateZonesInput {
    zone_name: String!
  }

  input CreateCitiesInput {
    city_name: String!
    area: String!
    zone_id: Int!
  }

  input CreateMachinesInput {
    machine_name: String!
    serial_number: Int!
    city_id: Int!
  }

  input CreateProductsInput {
    product_name: String!
    product_description: String!
    price: Float!
    quantity: Int!
    machine_id: Int!
    city_id: Int!
  }
`;

export default typeDefs;
