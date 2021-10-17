import { errorResponse, erroValidationDataResponse, Response, successResponse } from 'src/common/apiResponses';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import RouletteType from '@src/structures/roulette.type';
import middyfy from '@libs/lambda';
import rouletteDynamo from '@functions/roulette/queries/roulette.dynamoDB';
import { existInDatabase } from '@src/common/existInDatabase';
import { rouletteIsOpen } from '@functions/roulette/utils/rouletteIsOpen';
import { drawRoulette } from '@functions/roulette/utils/drawRoulette';
import BetType from '@src/structures/bet.type';
import { betsByRouletteId } from './utils/betsByRouletteId';
import { getBetsWinner } from './utils/getBetsWinner';

const { ROULETTE_TABLE } = process.env;
const tableName = ROULETTE_TABLE;

const closeBetsFunction: ValidatedEventAPIGatewayProxyEvent<RouletteType> = async (
  event: AWSLambda.APIGatewayEvent,
): Promise<Response> => {
  const bet: BetType = event.body as unknown as BetType;
  try {
    const existRoulette = await existInDatabase(bet.rouletteId, tableName);
    if (!existRoulette) return erroValidationDataResponse({ message: 'Roulette not found' });
    const rouletteIsOpenResp = await rouletteIsOpen({ id: bet.rouletteId });
    if (!rouletteIsOpenResp)
      return erroValidationDataResponse({ message: 'Bets for this roulette wheel have already been closed.' });
    const rouletteResponse = await rouletteDynamo
      .updateOpening({ id: bet.rouletteId, opening: false }, tableName)
      .catch((err) => {
        console.log('error in dynamo updated', err);
        return null;
      });
    if (!rouletteResponse) return errorResponse({ message: 'Failed to updated database' });

    const bets: BetType[] = await betsByRouletteId({ rouletteId: bet.rouletteId });
    const winner = await drawRoulette({});
    const betsWinner = await getBetsWinner({ ...winner, bets });

    return successResponse({
      message: `Bets with roulette id ${bet.rouletteId} closed succesfull`,
      success: true,
      ...winner,
      ...betsWinner,
      bets,
    });
  } catch (error) {
    return errorResponse({
      message: `I cannot open the roulette ${bet.rouletteId}`,
      success: false,
    });
  }
};
export const closeBets = middyfy(closeBetsFunction);
