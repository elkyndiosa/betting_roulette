import { QueryOutput } from '@aws-sdk/client-dynamodb';
import { documentClient } from '@libs/dynamoDB';

const { ROULETTE_TABLE } = process.env;
const TableName = ROULETTE_TABLE;

const BetDynamo = {
  async betsByRouletteId(data) {
    const { rouletteId } = data;
    console.log('rouletteId 3', rouletteId);
    console.log('data 3 ', data);

    try {
      const params = {
        TableName,
        IndexName: 'rouletteIdIndex',
        KeyConditionExpression: '#rouletteId = :rouletteId',
        ExpressionAttributeNames: {
          '#rouletteId': 'rouletteId',
        },
        ExpressionAttributeValues: {
          ':rouletteId': rouletteId,
        },
        ProjectionExpression: 'rouletteId',
        ScanIndexForward: false,
      };
      const res: QueryOutput = await documentClient.query(params).promise();
      if (!res) {
        throw Error(`There was an error find bets with roulette id ${rouletteId} in table ${TableName}`);
      }
      return res.Items;
    } catch (error) {
      console.log('error when find bets with roulette', error);
      throw Error(`There was an error find bets with roulette id ${rouletteId} in table ${TableName}`);
    }
  },
};
export default BetDynamo;
