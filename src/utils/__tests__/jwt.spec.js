import expect from 'expect';
import { decodeJWT, signJWT } from '../jwt';

const data = {
  mode: 'test',
  range: 'jwt',
};

const secret = 'secret';

describe('Signing and decoding JWT', () => {
  test('Should effectively sign and decode JWT with matching properties', async () => {
    const jwt = signJWT(data, secret, undefined);
    const decoded = await decodeJWT(jwt, secret);
    await decodeJWT(jwt);
    expect(typeof jwt).toEqual('string');
    expect(decoded).toHaveProperty('mode', 'test');
    expect(decoded).toHaveProperty('range', 'jwt');
  });

  test('Should throw an error when cannot decode JWT', async () => {
    try {
      const jwt = signJWT(data, secret, undefined);
      await decodeJWT(jwt, null);
    } catch (e) {
      expect(e.message).toBeTruthy();
    }
  });
});
