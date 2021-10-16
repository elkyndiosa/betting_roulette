import { errorResponse, Response, successResponse } from 'src/common/apiResponses';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import RouletteType from '@src/structures/roulette.type';
import middyfy from '@libs/lambda';
import Dynamo from '@libs/dynamoDB';

const { ROULETTE_TABLE } = process.env;
const tableName = ROULETTE_TABLE;

const createFunction: ValidatedEventAPIGatewayProxyEvent<RouletteType> = async (
  event: AWSLambda.APIGatewayEvent,
): Promise<Response> => {
  const roulette: RouletteType = event.body as unknown as RouletteType;
  roulette.createdByUserId = event.headers.Authorization;
  try {
    const newRoulette = await Dynamo.write(roulette, tableName).catch((err) => {
      console.log('error in dynamo write', err);
      return null;
    });

    if (!newRoulette) {
      return errorResponse({ message: 'Failed to write user by ID' });
    }
    return successResponse({
      message: `Roulette ${roulette.name} created succesfull`,
      roulette: { id: newRoulette.id },
    });
  } catch (error) {
    return errorResponse({
      message: `I cannot create the roulette ${roulette.name}`,
    });
  }
};

export const create = middyfy(createFunction);
