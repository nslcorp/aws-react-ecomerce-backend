import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { BOOKS_MOCK } from '../../mock/books.mock';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<void> = async () => {
  try {
    return formatJSONResponse(BOOKS_MOCK);

  } catch (error) {
    console.error(error);
    const data = {message: 'Unhundled server error. See logs', error}
    return formatJSONResponse(data, 500);
  }
};

export const main = middyfy(getProductsList);
