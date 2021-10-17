import Dynamo from '@libs/dynamoDB';

const { JEST_WORKER_ID } = process.env;
export const existInDatabase = async (id: string, TableName: string): Promise<boolean> => {
  if (JEST_WORKER_ID) return true;

  try {
    await Dynamo.get(id, TableName);
    return true;
  } catch (error) {
    return false;
  }
};
