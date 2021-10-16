import { isApiGatewayResponse } from '@src/testUtils/validators';
import { eventGenerator } from '../../testUtils/eventGenerator';
import { main } from './roulette';
import mock = require('./mock.json');

describe('Validating entity roulette', () => {
  test('Creation of resource', async () => {
    const context = null;
    const callback = null;
    const event = eventGenerator(mock);
    const resp = await main(event, context, callback);
    expect(resp.statusCode).toBe(200);
    expect(resp).toBeDefined();
    expect(isApiGatewayResponse(resp)).toBe(true);
    const body = JSON.parse(resp.body);
    expect(body).toEqual({ message: 'Roulette Roulette of test created succesfull', roulette: mock.body });
  });
});
