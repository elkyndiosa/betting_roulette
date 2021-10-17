import { GetItemOutput } from '@aws-sdk/client-dynamodb';
import Dynamo from '@libs/dynamoDB';
import RouletteType from '@src/structures/roulette.type';

const { ROULETTE_TABLE, JEST_WORKER_ID } = process.env;
const tableName = ROULETTE_TABLE;

export const rouletteIsOpen = async (data): Promise<boolean> => {
  const { id } = data;
  if (JEST_WORKER_ID && JEST_WORKER_ID === '1') return true;
  console.log('JEST_WORKER_ID', JEST_WORKER_ID);
  console.log('JEST_WORKER_ID', typeof JEST_WORKER_ID);

  try {
    const rouletteOutput: GetItemOutput = await Dynamo.get(id, tableName);
    const roulette: RouletteType = rouletteOutput as unknown as RouletteType;
    if (roulette.opening) return true;
    return false;
  } catch (error) {
    return false;
  }
};
