import { REQUEST_FIELDS } from '../constants';

export const handleSequelizeErrors = ([{ type, ...errors }]) => {
  switch (type) {
    case 'unique violation':
      return `'${errors.value}' is already in use as ${REQUEST_FIELDS[errors.path] || ''}`;
    case 'notNull Violation':
      return `${REQUEST_FIELDS[errors.path]} field is of an incorrect value.`;
    default: return 'Unfourtunately, your request can not be processed at this time.';
  }
};
