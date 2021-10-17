import { ScanOutput, UpdateItemOutput } from '@aws-sdk/client-dynamodb';
import { documentClient } from '@libs/dynamoDB';
import BetType from '@src/structures/bet.type';

const { BET_TABLE } = process.env;
const TableName = BET_TABLE;

const BetDynamo = {
  async betsByRouletteId(data) {
    const { rouletteId } = data;
    try {
      const params = {
        TableName,
        FilterExpression: 'rouletteId = :rouletteId',
        ExpressionAttributeValues: {
          ':rouletteId': rouletteId,
        },
      };
      const res: ScanOutput = await documentClient.scan(params).promise();
      if (!res) {
        throw Error(`There was an error find bets with roulette id ${rouletteId} in table ${TableName}`);
      }
      return res.Items;
    } catch (error) {
      console.log('error when find bets with roulette', error);
      throw Error(`There was an error find bets with roulette id ${rouletteId} in table ${TableName}`);
    }
  },
  async updateOnClosing(data: BetType) {
    console.log('data', data);
    try {
      const params = {
        TableName,
        Key: {
          id: data.id,
        },
        UpdateExpression: 'SET #closed = :closed, #winner = :winner, #earnings = :earnings, #closeDate = :closeDate',
        ExpressionAttributeNames: {
          '#closed': 'closed',
          '#winner': 'winner',
          '#earnings': 'earnings',
          '#closeDate': 'closeDate',
        },
        ExpressionAttributeValues: {
          ':closed': data.closed,
          ':winner': data.winner,
          ':earnings': data.earnings,
          ':closeDate': data.closeDate,
        },
        ReturnValues: 'ALL_NEW',
      };
      const res: UpdateItemOutput = await documentClient.update(params).promise();
      if (!res) {
        throw Error(`There was an error updating id of ${data.id} in table ${TableName}`);
      }
      return data;
    } catch (error) {
      console.log('error when updating bet', error);
      throw Error(`There was an error updating id of ${data.id} in table ${TableName}`);
    }
  },
};
export default BetDynamo;
