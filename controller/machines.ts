import { createMachines, getMachines, getMachineById } from '../services/machines';
import { validateJwtToken } from '../common/common';

export const createMachinesControllerFunc = async (parent: any, args: any, context: any, info: any): Promise<any> => {
  let response = {};

  const token = context.token;
  const errorMessage = validateJwtToken(token);
  if (!errorMessage) {
    const machineNameInput = args.input.machine_name;
    const serialNumberInput = args.input.serial_number;
    const cityIdInput = args.input.city_id;
    if (machineNameInput && serialNumberInput && cityIdInput) {
      await createMachines(machineNameInput, serialNumberInput, cityIdInput);
      response = {
        message: 'createMachines',
      };
    }
  } else {
    response = {
      message: errorMessage,
    };
  }

  return response;
};

export const getMachinesControllerFunc = async (parent: any, args: any, context: any, info: any): Promise<any> => {
  let response = {};

  const token = context.token;
  const errorMessage = validateJwtToken(token);
  if (!errorMessage) {
    const machines = await getMachines();
    if (machines) {
      const formattedMachines = machines.map((item: any, i: number) => {
        const newObj = {
          city: item.cities,
        };
        const newItem = Object.assign(item, newObj);
        return newItem;
      });

      response = {
        message: 'getMachines',
        machines: formattedMachines,
      };
    } else {
      response = {
        message: 'getMachines',
        machines: [],
      };
    }
  } else {
    response = {
      message: errorMessage,
    };
  }

  return response;
};

export const getMachineByIdControllerFunc = async (parent: any, args: any, context: any, info: any): Promise<any> => {
  let response = {};

  const token = context.token;
  const errorMessage = validateJwtToken(token);
  if (!errorMessage) {
    const idInput = args.id;
    if (idInput) {
      const machine = await getMachineById(idInput);
      if (machine) {
        machine['city'] = machine['cities'];
      }

      response = {
        message: 'getMachineById',
        machine: machine,
      };
    } else {
      response = {
        message: 'getMachineById, no id input',
        machine: {},
      };
    }
  } else {
    response = {
      message: errorMessage,
    };
  }

  return response;
};
