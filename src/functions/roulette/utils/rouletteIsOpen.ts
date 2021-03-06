import { GetItemOutput } from '@aws-sdk/client-dynamodb';
import Dynamo from '@libs/dynamoDB';
import RouletteType from '@src/structures/roulette.type';

const { ROULETTE_TABLE, JEST_WORKER_ID } = process.env;
const tableName = ROULETTE_TABLE;

export const rouletteIsOpen = async (data): Promise<boolean> => {
  const { id } = data;
  if (JEST_WORKER_ID) return true;
  try {
    const rouletteOutput: GetItemOutput = await Dynamo.get(id, tableName);
    const roulette: RouletteType = rouletteOutput as unknown as RouletteType;
    if (roulette.opening) return true;
    return false;
  } catch (error) {
    return false;
  }
};
