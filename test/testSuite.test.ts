import { userTest } from './user';
import { zoneTest } from './zone';
import { cityTest } from './city';
import { machineTest } from './machine';
import { productTest } from './product';

describe('testSuite test case', () => {
  userTest();
  zoneTest();
  cityTest();
  machineTest();
  productTest();
});
