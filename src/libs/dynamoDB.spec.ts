import RouletteType from '@src/structures/roulette.type';
import mongoid from 'mongoid-js';
import Dynamo from './dynamoDB';

describe('Validate DynamoDb', () => {
  // test('successRespponse - Validate that the api respponse returns the desired object', async () => {
  //   // const respp = await dynamoDbfrom.put({ TableName: 'roulette-local', Item: { id: '1', hello: 'world' } }).promise();
  //   // eslint-disable-next-line no-console
  //   // console.log(respp);

  //   expect(200).toBe(200);
  // });

  const validTableName = 'roulette-local';
  const timestamp = new Date().toISOString();
  const data: RouletteType = {
    id: mongoid(),
    name: 'Roulette test',
    description: 'Roulette test deswcription',
    opening: false,
    createdByUserId: mongoid(),
    createdAt: timestamp,
  };
  test('Dynamo is an object', () => {
    expect(typeof Dynamo).toBe('object');
  });
  test('dynamo has get and write', () => {
    expect(typeof Dynamo.get).toBe('function');
    expect(typeof Dynamo.write).toBe('function');
  });
  test('Dynamo write works', async () => {
    expect.assertions(1);
    try {
      const resp = await Dynamo.write(data, validTableName);
      expect(resp).toBe(data);
    } catch (error) {
      console.log('error in dynamo write test', error);
    }
  });

  test('dynamo get works', async () => {
    expect.assertions(1);
    try {
      const resp = await Dynamo.get(data.id, validTableName);
      expect(resp).toEqual(data);
    } catch (error) {
      console.log('error in dynamo get', error);
    }
  });
});
