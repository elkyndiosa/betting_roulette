import { isApiGatewayResponse } from '@src/testUtils/validators';
import { eventGenerator } from '../../testUtils/eventGenerator';
import { openRoulette } from './openRoulette';
import mock = require('./mock.json');

describe('Validate open roulette', () => {
  test('Update opening to true', async () => {
    const context = null;
    const callback = null;
    const event = eventGenerator(mock);
    const resp = await openRoulette(event, context, callback);
    expect(resp.statusCode).toBe(200);
    expect(resp).toBeDefined();
    expect(isApiGatewayResponse(resp)).toBe(true);
    const body = JSON.parse(resp.body);
    expect(body).toEqual({ message: `Roulette with id ${mock.body.id} updated succesfull`, success: true });
  });
});
