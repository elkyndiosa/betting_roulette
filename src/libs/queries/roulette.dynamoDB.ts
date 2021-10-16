import { UpdateItemOutput } from '@aws-sdk/client-dynamodb';
import { documentClient } from '../dynamoDB';

const RouletteDynamo = {
  async updateOpening(data: any, TableName: string) {
    try {
      const params = {
        TableName,
        Key: {
          id: data.id,
        },
        UpdateExpression: 'SET opening = :opening',
        ExpressionAttributeValues: {
          ':opening': data.opening,
        },
        ReturnValues: 'ALL_NEW',
      };
      const res: UpdateItemOutput = documentClient.update(params).promise();
      if (!res) {
        throw Error(`There was an error updating id of ${data.id} in table ${TableName}`);
      }
      return data;
    } catch (error) {
      console.log('error when opening roulette', error);
      throw Error(`There was an error updating id of ${data.id} in table ${TableName}`);
    }
  },
};
export default RouletteDynamo;
