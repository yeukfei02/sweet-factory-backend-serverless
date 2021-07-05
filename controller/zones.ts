import { createZones, getZones, getZoneById } from '../services/zones';
import { validateJwtToken } from '../common/common';

export const createZonesControllerFunc = async (parent: any, args: any, context: any, info: any): Promise<any> => {
  let response = {};

  const token = context.token;
  const errorMessage = validateJwtToken(token);
  if (!errorMessage) {
    const zoneNameInput = args.input.zone_name;
    if (zoneNameInput) {
      await createZones(zoneNameInput);
      response = {
        message: 'createZones',
      };
    }
  } else {
    response = {
      message: errorMessage,
    };
  }

  return response;
};

export const getZonesControllerFunc = async (parent: any, args: any, context: any, info: any): Promise<any> => {
  let response = {};

  const token = context.token;
  const errorMessage = validateJwtToken(token);
  if (!errorMessage) {
    const zones = await getZones();
    if (zones) {
      response = {
        message: 'getZones',
        zones: zones,
      };
    } else {
      response = {
        message: 'getZones',
        zones: [],
      };
    }
  } else {
    response = {
      message: errorMessage,
    };
  }

  return response;
};

export const getZoneByIdControllerFunc = async (parent: any, args: any, context: any, info: any): Promise<any> => {
  let response = {};

  const token = context.token;
  const errorMessage = validateJwtToken(token);
  if (!errorMessage) {
    const idInput = args.id;
    if (idInput) {
      const zone = await getZoneById(idInput);
      response = {
        message: 'getZoneById',
        zone: zone,
      };
    } else {
      response = {
        message: 'getZoneById, no id input',
        zone: {},
      };
    }
  } else {
    response = {
      message: errorMessage,
    };
  }

  return response;
};
