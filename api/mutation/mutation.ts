import { mutationField, nonNull } from 'nexus';
import { SignupResult } from '../types/signupResult';
import { LoginResult } from '../types/loginResult';
import { CreateZonesResult } from '../types/createZonesResult';
import { CreateCitiesResult } from '../types/createCitiesResult';
import { CreateMachinesResult } from '../types/createMachinesResult';
import { CreateProductsResult } from '../types/createProductsResult';

import { SignupInput } from '../input/signup';
import { LoginInput } from '../input/login';
import { CreateZonesInput } from '../input/createZones';
import { CreateCitiesInput } from '../input/createCities';
import { CreateMachinesInput } from '../input/createMachines';
import { CreateProductsInput } from '../input/createProducts';

import { signupControllerFunc, loginControllerFunc } from '../../controller/users';
import { createZonesControllerFunc } from '../../controller/zones';
import { createCitiesControllerFunc } from '../../controller/cities';
import { createMachinesControllerFunc } from '../../controller/machines';
import { createProductsControllerFunc } from '../../controller/products';

export const signup = mutationField('signup', {
  type: nonNull(SignupResult),
  args: {
    input: nonNull(SignupInput),
  },
  resolve: signupControllerFunc,
});

export const login = mutationField('login', {
  type: nonNull(LoginResult),
  args: {
    input: nonNull(LoginInput),
  },
  resolve: loginControllerFunc,
});

export const createZones = mutationField('createZones', {
  type: nonNull(CreateZonesResult),
  args: {
    input: nonNull(CreateZonesInput),
  },
  resolve: createZonesControllerFunc,
});

export const createCities = mutationField('createCities', {
  type: nonNull(CreateCitiesResult),
  args: {
    input: nonNull(CreateCitiesInput),
  },
  resolve: createCitiesControllerFunc,
});

export const createMachines = mutationField('createMachines', {
  type: nonNull(CreateMachinesResult),
  args: {
    input: nonNull(CreateMachinesInput),
  },
  resolve: createMachinesControllerFunc,
});

export const createProducts = mutationField('createProducts', {
  type: nonNull(CreateProductsResult),
  args: {
    input: nonNull(CreateProductsInput),
  },
  resolve: createProductsControllerFunc,
});
