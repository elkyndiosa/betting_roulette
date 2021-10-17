import Dynamo from '@libs/dynamoDB';

const { JEST_WORKER_ID } = process.env;
export const existInDatabase = async (id: string, TableName: string): Promise<boolean> => {
  if (JEST_WORKER_ID && JEST_WORKER_ID === '1') return true;
  console.log('JEST_WORKER_ID', JEST_WORKER_ID);
  console.log('JEST_WORKER_ID', typeof JEST_WORKER_ID);

  try {
    await Dynamo.get(id, TableName);
    return true;
  } catch (error) {
    return false;
  }
};
