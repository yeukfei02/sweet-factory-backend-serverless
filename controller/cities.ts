import { createCities, getCities, getCityById } from '../services/cities';
import { validateJwtToken } from '../helpers/helpers';

export const createCitiesControllerFunc = async (parent: any, args: any, context: any, info: any): Promise<any> => {
  let response = {};

  const token = context.token;
  const errorMessage = validateJwtToken(token);
  if (!errorMessage) {
    const cityNameInput = args.input.city_name;
    const areaInput = args.input.area;
    const zoneIdInput = args.input.zone_id;
    if (cityNameInput && areaInput && zoneIdInput) {
      await createCities(cityNameInput, areaInput, zoneIdInput);
      response = {
        message: 'createCities',
      };
    }
  } else {
    response = {
      message: errorMessage,
    };
  }

  return response;
};

export const getCitiesControllerFunc = async (parent: any, args: any, context: any, info: any): Promise<any> => {
  let response = {};

  const token = context.token;
  const errorMessage = validateJwtToken(token);
  if (!errorMessage) {
    const cities = await getCities();
    if (cities) {
      const formattedCities = cities.map((item: any, i: number) => {
        const newObj = {
          zone: item.zones,
        };
        const newItem = Object.assign(item, newObj);
        return newItem;
      });

      response = {
        message: 'getCities',
        cities: formattedCities,
      };
    } else {
      response = {
        message: 'getCities',
        cities: [],
      };
    }
  } else {
    response = {
      message: errorMessage,
    };
  }

  return response;
};

export const getCityByIdControllerFunc = async (parent: any, args: any, context: any, info: any): Promise<any> => {
  let response = {};

  const token = context.token;
  const errorMessage = validateJwtToken(token);
  if (!errorMessage) {
    const idInput = args.id;
    if (idInput) {
      const city = await getCityById(idInput);
      if (city) {
        city['zone'] = city['zones'];
      }
      response = {
        message: 'getCityById',
        city: city,
      };
    } else {
      response = {
        message: 'getCityById, no id input',
        city: {},
      };
    }
  } else {
    response = {
      message: errorMessage,
    };
  }

  return response;
};
