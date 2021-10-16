import { GetItemInput, PutItemInput, GetItemOutput, PutItemOutput } from '@aws-sdk/client-dynamodb';
import AWS from './aws-sdk';

const { IS_OFFLINE, JEST_WORKER_ID } = process.env;
let options = {};
if (IS_OFFLINE) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  };
}

if (JEST_WORKER_ID) {
  options = {
    region: 'local-env',
    endpoint: 'http://localhost:8000',
    sslEnabled: false,
  };
}
const documentClient = new AWS.DynamoDB.DocumentClient(options);

const Dynamo = {
  async get(id: any, TableName: string) {
    const params: GetItemInput = {
      TableName,
      Key: {
        id,
      },
    };
    const data: GetItemOutput = await documentClient.get(params).promise();
    if (!data || !data.Item) {
      const errorMessage = `There was an error fetching the data for ID of ${id} from ${TableName}`;
      throw Error(errorMessage);
    }
    return data.Item;
  },
  async write(data: any, TableName: string) {
    if (!data.id) {
      throw Error('no id on the data');
    }
    const params: PutItemInput = {
      TableName,
      Item: data,
    };
    const res: PutItemOutput = await documentClient.put(params).promise();
    if (!res) {
      throw Error(`There was an error inserting id of ${data.id} in table ${TableName}`);
    }
    return data;
  },
};
export default Dynamo;
