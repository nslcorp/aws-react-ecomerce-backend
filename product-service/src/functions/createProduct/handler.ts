import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyEventBase } from 'aws-lambda';

import { DynamoDB } from 'aws-sdk';

const dynamodb = new DynamoDB.DocumentClient();

const createProduct: ValidatedEventAPIGatewayProxyEvent<void> = async (event: APIGatewayProxyEventBase<any>) => {
  // const data = await dynamodb.scan({TableName: 'book-shop-products'}).promise();
  if (!event.body) {
    const data = {message: 'Body was not provided'}
    return formatJSONResponse(data, 400);
  }


  try {
    const {id, title, description, price, count} = event.body as any;
    const response = await dynamodb.put({
      TableName: process.env.TABLE_PRODUCTS, Item: {
        id, title, description, price, count
      }
    }).promise()
    console.log(id, title, description, price, count)
    console.log('getProductsList: works', process.env.TABLE_PRODUCTS, process.env.TABLE_STOCKS)
    console.log('getProductsList: works', process.env.TABLE_PRODUCTS, process.env.TABLE_STOCKS)
    return formatJSONResponse({createProducts: 'succes', response});

  } catch (error) {

    if (error.message) {
      return formatJSONResponse({message: error.message}, 400);
    }
    const data = {message: 'Unhundled server error. See logs', error}
    console.error(error);
    return formatJSONResponse(data, 400);
  }
};

export const main = middyfy(createProduct);
