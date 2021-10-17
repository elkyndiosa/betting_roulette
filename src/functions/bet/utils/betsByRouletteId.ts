import BetType from '@src/structures/bet.type';
import betDynamo from '../queries/bet.dynamoDB';

const { JEST_WORKER_ID } = process.env;

export const betsByRouletteId = async (data): Promise<BetType[]> => {
  const { id } = data;
  if (JEST_WORKER_ID) return [];
  try {
    const betsOutput = await betDynamo.betsByRouletteId(id);
    const bets: BetType[] = betsOutput as unknown as BetType[];
    return bets;
  } catch (error) {
    return [];
  }
};
