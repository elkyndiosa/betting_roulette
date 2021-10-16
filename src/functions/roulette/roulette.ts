import { errorResponse, Response, successResponse } from 'src/common/apiResponses';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import RouletteType from '@src/structures/roulette.type';
import middyfy from '@libs/lambda';

const store: ValidatedEventAPIGatewayProxyEvent<RouletteType> = async (
  event: AWSLambda.APIGatewayEvent,
): Promise<Response> => {
  const body = JSON.parse(event.body);
  try {
    return successResponse({
      message: `Hello ${body.name}, welcome to the exciting Serverless world!`,
    });
  } catch (error) {
    return errorResponse({
      message: `Hello ${body.name}, welcome to the exciting Serverless world!`,
    });
  }
};

export const main = middyfy(store);
