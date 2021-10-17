import { drawRoulette } from './drawRoulette';

describe('Validate draw roulette', () => {
  test('Expect a number between 0 - 36 and a color red or black', async () => {
    const lowerInclusive = 0;
    const upperInclusive = 37;
    const expectedColor = ['red', 'black'];
    const colorIsAcceptable = (color) => expectedColor.includes(color);
    const { winningNumber, winningColor } = await drawRoulette({});
    expect(winningNumber).toBeGreaterThanOrEqual(lowerInclusive);
    expect(winningNumber).toBeLessThan(upperInclusive);
    const isColor = colorIsAcceptable(winningColor);
    expect(isColor).toBeTruthy();
  });
});
