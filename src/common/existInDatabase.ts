import Dynamo from '@libs/dynamoDB';

export const existInDatabase = async (id: string, TableName: string): Promise<boolean> => {
  try {
    await Dynamo.get(id, TableName);
    return true;
  } catch (error) {
    return false;
  }
};
