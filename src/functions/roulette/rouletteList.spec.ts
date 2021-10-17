import { eventGenerator } from '@src/testUtils/eventGenerator';
import { isApiGatewayResponse } from '@src/testUtils/validators';
import mock = require('./mock.json');
import { rouletteList } from './rouletteList';

describe('Validating list of roulette', () => {
  test('get list', async () => {
    const context = null;
    const callback = null;
    const event = eventGenerator(mock);
    const resp = await rouletteList(event, context, callback);
    expect(resp.statusCode).toBe(200);
    expect(resp).toBeDefined();
    expect(isApiGatewayResponse(resp)).toBe(true);
    const body = JSON.parse(resp.body);
    expect(body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
        roulette: expect.objectContaining({
          Items: expect.any(Array),
          Count: expect.any(Number),
          ScannedCount: expect.any(Number),
        }),
        success: expect.any(Boolean),
      }),
    );
  });
});
