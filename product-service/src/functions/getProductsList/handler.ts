import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import DbService from 'src/services/DynamoDBService';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<void> = async () => {
  try {
    const data = await DbService.getAllProducts();
    return formatJSONResponse(data);

  } catch (error) {
    if (error.message) {
      return formatJSONResponse({message: error.message}, 400);
    }
    const data = {message: 'Unhundled server error. See logs', error}
    console.error(error);
    return formatJSONResponse(data, 400);
  }
};

export const main = middyfy(getProductsList);
