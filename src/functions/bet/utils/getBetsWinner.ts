import BetType from '@src/structures/bet.type';
import BetsWinnerType from '@src/structures/betsWinnerType.type';
import BetDynamo from '../queries/bet.dynamoDB';

const updateOnClosingMultiple = async (bets: BetType[]) => {
  bets.map(async (bet: BetType) => {
    const resp = BetDynamo.updateOnClosing(bet);
    return resp;
  });
  return true;
};
const filterBetsWinner = async (data): Promise<BetsWinnerType> => {
  const { winningNumber, winningColor, bets } = data;
  const betsWinnerNumber = [];
  const betsWinnerColor = [];
  const newBets = bets.map((bet: BetType) => {
    bet.closed = true;
    bet.closeDate = new Date().toISOString();
    bet.winner = false;
    bet.earnings = 0;
    if (bet.number === winningNumber && bet.type === 'number') {
      bet.winner = true;
      bet.earnings = bet.amount * 5;
      betsWinnerNumber.push(bet);
    }
    if (bet.color === winningColor && bet.type === 'color') {
      bet.winner = true;
      bet.earnings = bet.amount * 1.8;
      betsWinnerColor.push(bet);
    }
    return bet;
  });
  await updateOnClosingMultiple(newBets);
  const totalBets = bets.length;
  const numberWinners = betsWinnerNumber.length + betsWinnerColor.length;
  const numberLosers = totalBets - numberWinners;
  return { numberWinners, numberLosers, totalBets, betsWinnerNumber, betsWinnerColor };
};

export const getBetsWinner = async ({ winningNumber, winningColor, bets }): Promise<BetsWinnerType> => {
  try {
    return await filterBetsWinner({ winningNumber, winningColor, bets });
  } catch (error) {
    return null;
  }
};
