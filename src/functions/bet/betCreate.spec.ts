import { isApiGatewayResponse } from '@src/testUtils/validators';
import { eventGenerator } from '../../testUtils/eventGenerator';
import { create } from './betCreate';
import mock = require('./mock.json');

describe('Validating entity bet', () => {
  test('Creation of resource', async () => {
    const context = null;
    const callback = null;
    const event = eventGenerator(mock);
    const resp = await create(event, context, callback);
    expect(resp.statusCode).toBe(200);
    expect(resp).toBeDefined();
    expect(isApiGatewayResponse(resp)).toBe(true);
    const body = JSON.parse(resp.body);
    expect(body).toEqual({
      message: `Roulette with id ${mock.body.id} has been created succesfull`,
      bet: mock.body,
    });
  });
});
