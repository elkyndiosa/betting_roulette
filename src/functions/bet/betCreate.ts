import { errorResponse, Response, successResponse } from 'src/common/apiResponses';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import middyfy from '@libs/lambda';
import Dynamo from '@libs/dynamoDB';
import BetType from '@src/structures/bet.type';

const { BET_TABLE } = process.env;
const tableName = BET_TABLE;

const createFunction: ValidatedEventAPIGatewayProxyEvent<BetType> = async (
  event: AWSLambda.APIGatewayEvent,
): Promise<Response> => {
  const bet: BetType = event.body as unknown as BetType;
  bet.userId = event.headers.Authorization;
  try {
    const newBet = await Dynamo.write(bet, tableName).catch((err) => {
      console.log('error in dynamo write', err);
      return null;
    });

    if (!newBet) {
      return errorResponse({ message: 'Failed to write bet by ID' });
    }
    return successResponse({
      message: `Roulette with id ${bet.id} has been created succesfull`,
      bet,
    });
  } catch (error) {
    return errorResponse({
      message: `I cannot create the bet`,
      success: false,
    });
  }
};

export const create = middyfy(createFunction);
