import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { BOOKS_MOCK } from '../../mock/books.mock';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<void> = async () => {
  return formatJSONResponse({
    data: BOOKS_MOCK
  });
};

export const main = middyfy(getProductsList);
