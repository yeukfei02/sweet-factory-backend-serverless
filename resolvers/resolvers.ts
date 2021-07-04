import {
  signupControllerFunc,
  loginControllerFunc,
  getUsersControllerFunc,
  getUserByIdControllerFunc,
} from '../controller/users';
import { createZonesControllerFunc, getZoneByIdControllerFunc, getZonesControllerFunc } from '../controller/zones';
import { createCitiesControllerFunc, getCitiesControllerFunc, getCityByIdControllerFunc } from '../controller/cities';
import {
  createMachinesControllerFunc,
  getMachinesControllerFunc,
  getMachineByIdControllerFunc,
} from '../controller/machines';
import {
  createProductsControllerFunc,
  getProductsControllerFunc,
  getProductByIdControllerFunc,
} from '../controller/products';

const resolvers = {
  Query: {
    getUsers: getUsersControllerFunc,
    getUserById: getUserByIdControllerFunc,

    getZones: getZonesControllerFunc,
    getZoneById: getZoneByIdControllerFunc,

    getCities: getCitiesControllerFunc,
    getCityById: getCityByIdControllerFunc,

    getMachines: getMachinesControllerFunc,
    getMachineById: getMachineByIdControllerFunc,

    getProducts: getProductsControllerFunc,
    getProductById: getProductByIdControllerFunc,
  },

  Mutation: {
    signup: signupControllerFunc,
    login: loginControllerFunc,

    createZones: createZonesControllerFunc,
    createCities: createCitiesControllerFunc,
    createMachines: createMachinesControllerFunc,
    createProducts: createProductsControllerFunc,
  },
};

export default resolvers;
