import BetType from './bet.type';

type BetsWinnerType = {
  betsWinnerColor: [] | BetType[];
  betsWinnerNumber: [] | BetType[];
  numberWinners: number;
  numberLosers: number;
  totalBets: number;
};
export default BetsWinnerType;
