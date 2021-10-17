import { isApiGatewayResponse } from '@src/testUtils/validators';
import { eventGenerator } from '../../testUtils/eventGenerator';
import { closeBets } from './closeBets';
import mock = require('./mock.json');

describe('Validating close bet', () => {
  test('Closed bets by roulette id', async () => {
    const context = null;
    const callback = null;
    const event = eventGenerator(mock);
    const resp = await closeBets(event, context, callback);
    console.log('resp', resp);
    expect(resp.statusCode).toBe(200);
    expect(resp).toBeDefined();
    expect(isApiGatewayResponse(resp)).toBe(true);
    const body = JSON.parse(resp.body);
    expect(body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
        success: expect.any(Boolean),
        bets: expect.any(Array),
        winningNumber: expect.any(Number),
        winningColor: expect.any(String),
        numberWinners: expect.any(Number),
        numberLosers: expect.any(Number),
        totalBets: expect.any(Number),
        betsWinnerNumber: expect.any(Array),
        betsWinnerColor: expect.any(Array),
      }),
    );
  });
});
