import { APIGatewayProxyEventBase } from 'aws-lambda';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import BaseError from 'src/errors/BaseError';
import mongodbService from 'src/services/db-service';


const createProduct: ValidatedEventAPIGatewayProxyEvent<void> = async (event: APIGatewayProxyEventBase<any>) => {
  // const data = await dynamodb.scan({TableName: 'book-shop-products'}).promise();
  if (!event.body) {
    const data = {message: 'Body was not provided'}
    return formatJSONResponse(data, 400);
  }

  try {
    const data = event.body as any;
    await mongodbService.createProduct(data)
    return formatJSONResponse({message: 'success'});

  } catch (error) {
    if(error instanceof BaseError){
      return formatJSONResponse(error.serializeError(), error.statusCode);
    }
    if(error.message){
      return formatJSONResponse({message: error.message}, 400);
    }
    const data = {message: 'Unhundled server error', error}
    return formatJSONResponse(data, 500);
  }
};

export const main = middyfy(createProduct);
