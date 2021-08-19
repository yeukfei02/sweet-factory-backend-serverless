import { queryField, nonNull, intArg } from 'nexus';
import { GetUsersResult } from '../types/getUsersResult';
import { GetUsersByIdResult } from '../types/getUsersByIdResult';
import { GetZonesResult } from '../types/getZonesResult';
import { GetZonesByIdResult } from '../types/getZonesByIdResult';
import { GetCitiesResult } from '../types/getCitiesResult';
import { GetCityByIdResult } from '../types/getCityByIdResult';
import { GetMachinesResult } from '../types/getMachinesResult';
import { GetMachineByIdResult } from '../types/getMachineByIdResult';
import { GetProductsResult } from '../types/getProductsResult';
import { GetProductByIdResult } from '../types/getProductByIdResult';

import { getUsersControllerFunc, getUserByIdControllerFunc } from '../../controller/users';
import { getZoneByIdControllerFunc, getZonesControllerFunc } from '../../controller/zones';
import { getCitiesControllerFunc, getCityByIdControllerFunc } from '../../controller/cities';
import { getMachinesControllerFunc, getMachineByIdControllerFunc } from '../../controller/machines';
import { getProductsControllerFunc, getProductByIdControllerFunc } from '../../controller/products';

export const getUsers = queryField('getUsers', {
  type: nonNull(GetUsersResult),
  args: {},
  resolve: getUsersControllerFunc,
});

export const getUserById = queryField('getUserById', {
  type: nonNull(GetUsersByIdResult),
  args: {
    id: intArg(),
  },
  resolve: getUserByIdControllerFunc,
});

export const getZones = queryField('getZones', {
  type: nonNull(GetZonesResult),
  args: {},
  resolve: getZonesControllerFunc,
});

export const getZoneById = queryField('getZoneById', {
  type: nonNull(GetZonesByIdResult),
  args: {
    id: intArg(),
  },
  resolve: getZoneByIdControllerFunc,
});

export const getCities = queryField('getCities', {
  type: nonNull(GetCitiesResult),
  args: {},
  resolve: getCitiesControllerFunc,
});

export const getCityById = queryField('getCityById', {
  type: nonNull(GetCityByIdResult),
  args: {
    id: intArg(),
  },
  resolve: getCityByIdControllerFunc,
});

export const getMachines = queryField('getMachines', {
  type: nonNull(GetMachinesResult),
  args: {},
  resolve: getMachinesControllerFunc,
});

export const getMachineById = queryField('getMachineById', {
  type: nonNull(GetMachineByIdResult),
  args: {
    id: intArg(),
  },
  resolve: getMachineByIdControllerFunc,
});

export const getProducts = queryField('getProducts', {
  type: nonNull(GetProductsResult),
  args: {},
  resolve: getProductsControllerFunc,
});

export const getProductById = queryField('getProductById', {
  type: nonNull(GetProductByIdResult),
  args: {
    id: intArg(),
  },
  resolve: getProductByIdControllerFunc,
});
