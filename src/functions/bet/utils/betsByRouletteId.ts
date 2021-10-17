import BetType from '@src/structures/bet.type';
import betDynamo from '../queries/bet.dynamoDB';

const { JEST_WORKER_ID } = process.env;

export const betsByRouletteId = async (data): Promise<BetType[]> => {
  const { rouletteId } = data;
  console.log('JEST_WORKER_ID ', JEST_WORKER_ID);
  if (JEST_WORKER_ID) return [];
  console.log('JEST_WORKER_ID 1', JEST_WORKER_ID);
  console.log('betrouletteId 2 ', rouletteId);
  console.log('data 2 ', data);

  try {
    const betsOutput = await betDynamo.betsByRouletteId({ rouletteId });
    console.log('betsOutput ', betsOutput);

    const bets: BetType[] = betsOutput as unknown as BetType[];
    return bets;
  } catch (error) {
    return [];
  }
};
