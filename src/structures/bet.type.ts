type BetType = {
  id: string;
  rouletteId: string;
  userId: string;
  type: string;
  number: string;
  color: string;
  amount: number;
  createdAt: string;
  closed: boolean;
  winner: boolean;
  earnings: number;
  closeDate: string;
};
export default BetType;
