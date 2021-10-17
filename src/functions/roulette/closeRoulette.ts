import { errorResponse, erroValidationDataResponse, Response, successResponse } from 'src/common/apiResponses';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import RouletteType from '@src/structures/roulette.type';
import middyfy from '@libs/lambda';
// import rouletteDynamo from '@libs/queries/roulette.dynamoDB';
import { existInDatabase } from '@src/common/existInDatabase';
import BetType from '@src/structures/bet.type';
import { betsByRouletteId } from '@functions/bet/utils/betsByRouletteId';
import { rouletteIsOpen } from './utils/rouletteIsOpen';

const { ROULETTE_TABLE } = process.env;
const tableName = ROULETTE_TABLE;

const closeRouletteFunction: ValidatedEventAPIGatewayProxyEvent<RouletteType> = async (
  event: AWSLambda.APIGatewayEvent,
): Promise<Response> => {
  const roulette: RouletteType = event.body as unknown as RouletteType;
  try {
    const existRoulette = await existInDatabase(roulette.id, tableName);
    if (!existRoulette) return erroValidationDataResponse({ message: 'Roulette not found' });
    const rouletteIsOpenResp = await rouletteIsOpen({ id: roulette.id });
    if (!rouletteIsOpenResp)
      return erroValidationDataResponse({ message: 'The roulette wheel has already been closed' });
    // const rouletteResponse = await rouletteDynamo
    //   .updateOpening({ ...roulette, opening: false }, tableName)
    //   .catch((err) => {
    //     console.log('error in dynamo updated', err);
    //     return null;
    //   });
    // if (!rouletteResponse) return errorResponse({ message: 'Failed to updated database' });
    console.log('betrouletteId 1 ', roulette.id);

    const bets: BetType[] = await betsByRouletteId({ rouletteId: roulette.id });
    console.log('bets ', bets);

    return successResponse({
      message: `Roulette with id ${roulette.id} updated succesfull`,
      success: true,
      bets,
    });
  } catch (error) {
    return errorResponse({
      message: `I cannot open the roulette ${roulette.name}`,
      success: false,
    });
  }
};
export const closeRoulette = middyfy(closeRouletteFunction);
