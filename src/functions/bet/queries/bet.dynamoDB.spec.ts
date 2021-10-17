// import RouletteType from '@src/structures/roulette.type';
// import mongoid from 'mongoid-js';
import BetType from '@src/structures/bet.type';
import BetDynamo from './bet.dynamoDB';
import mock = require('../mock.json');

describe('Validate RouleteDynamoDb', () => {
  const data: BetType = mock.body;
  test('RouleteDynamo is an object', () => {
    expect(typeof BetDynamo).toBe('object');
  });
  test('dynamo has get by roulette id and update on clossing', () => {
    expect(typeof BetDynamo.betsByRouletteId).toBe('function');
    expect(typeof BetDynamo.updateOnClosing).toBe('function');
  });
  test('Bets - get by roulette id', async () => {
    expect.assertions(1);
    try {
      const resp = await BetDynamo.betsByRouletteId({ rouletteId: data.rouletteId });
      expect(typeof resp).toBe('object');
    } catch (error) {
      console.log('error in dynamo write test', error);
    }
  });
});
