export const drawRoulette = async ({ initial = 0, final = 36 }): Promise<any> => {
  const winningNumber = Math.floor(Math.random() * (final - initial)) + initial;
  const winningColor = winningNumber % 2 ? 'black' : 'red';
  return { winningNumber, winningColor };
};
