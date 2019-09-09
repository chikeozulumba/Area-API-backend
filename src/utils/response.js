import { REQUEST_FIELDS } from '../constants';

export const handleSequelizeErrors = ([{ type, ...errors }]) => {
  switch (type) {
    case 'unique violation':
      return `'${errors.value}' is already in use as ${REQUEST_FIELDS[errors.path] || ''}`;
    default: return null;
  }
};
