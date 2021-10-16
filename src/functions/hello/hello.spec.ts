import { isApiGatewayResponse } from '@src/testUtils/validators';
import { eventGenerator } from '../../testUtils/eventGenerator';
import { main } from './hello';

describe('Hello word response', () => {
  test('validate response type', async () => {
    const context = null;
    const callback = null;
    const event = eventGenerator({
      body: {
        name: 'tom',
        description: 'hello word',
      },
    });
    const resp = await main(event, context, callback);
    expect(resp.statusCode).toBe(200);
    expect(resp).toBeDefined();
    expect(isApiGatewayResponse(resp)).toBe(true);
    const body = JSON.parse(resp.body);
    expect(body).toEqual({
      message: `Hello tom, welcome to the exciting Serverless world!`,
    });
  });
});
