import expect from 'expect';
import { handleSequelizeErrors } from '../response';
import { REQUEST_FIELDS } from '../../constants';

const uniqueViolation = [
  {
    type: 'unique violation',
    value: '783y878y',
    path: 'fullName',
  },
];

const notNullViolation = [
  {
    type: 'notNull Violation',
    value: '783y878y',
    path: 'fullName',
  },
];

const defaultViolation = [
  {
    type: 'default Violation',
    value: '783y878y',
    path: 'fullName',
  },
];

describe('Authentication Route :REGISTER', () => {
  test('Errors recieved based on sequelize database unique violations', () => {
    const [{ type, ...errors }] = uniqueViolation;
    const response = handleSequelizeErrors(uniqueViolation);
    expect(response).toEqual(`'${errors.value}' is already in use as ${REQUEST_FIELDS[errors.path] || ''}`);
  });
  test('Errors recieved based on sequelize database not Null violations', () => {
    const [{ type, ...errors }] = notNullViolation;
    const response = handleSequelizeErrors(notNullViolation);
    expect(response).toEqual(`${REQUEST_FIELDS[errors.path]} field is of an incorrect value.`);
  });
  test('Errors recieved based on sequelize database not Null violations', () => {
    const response = handleSequelizeErrors(defaultViolation);
    expect(response).toEqual('Unfourtunately, your request can not be processed at this time.');
  });
});
