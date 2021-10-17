import { errorResponse, Response, successResponse } from 'src/common/apiResponses';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import RouletteType from '@src/structures/roulette.type';
import middyfy from '@libs/lambda';
import Dynamo from '@libs/dynamoDB';

const { ROULETTE_TABLE } = process.env;
const tableName = ROULETTE_TABLE;

const rouletteListFunction: ValidatedEventAPIGatewayProxyEvent<RouletteType> = async (): Promise<Response> => {
  try {
    const roulette = await Dynamo.getAll(tableName).catch((err) => {
      console.log('error in dynamo write', err);
      return null;
    });
    return successResponse({
      message: `Successful query`,
      success: true,
      roulette,
    });
  } catch (error) {
    return errorResponse({
      message: `An error has occurred, please contact us later.`,
      success: false,
    });
  }
};
export const rouletteList = middyfy(rouletteListFunction);
