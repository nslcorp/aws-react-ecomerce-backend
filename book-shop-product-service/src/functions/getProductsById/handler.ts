import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { BOOKS_MOCK } from '../../mock/books.mock';


const getProductsById: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
  const id = event.pathParameters.productId;
  if (!id) {
    return formatJSONResponse({message: 'ID parameter is missing'})
  }


  // logic of fetching products from DB | service | api or mock (current)
  const book = BOOKS_MOCK.find(record => record.id === id)
  if (!book) {
    return formatJSONResponse({message: `There is no book with ID:${id}`})
  }

  return formatJSONResponse({data: book});
};

export const main = middyfy(getProductsById);
