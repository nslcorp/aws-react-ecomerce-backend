import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import { DynamoDB } from 'aws-sdk';
const dynamodb = new DynamoDB.DocumentClient();

const getProductsList: ValidatedEventAPIGatewayProxyEvent<void> = async () => {
  console.log(process.env.TABLE_PRODUCTS)
  try {
    const data = await dynamodb.scan({TableName: process.env.TABLE_PRODUCTS}).promise();
    console.log(data)
    return formatJSONResponse(data);

  } catch (error) {
    if(error.message){
      return formatJSONResponse({message: error.message}, 400);
    }
    const data = {message: 'Unhundled server error. See logs', error}
    console.error(error);
    return formatJSONResponse(data, 400);
  }
};

export const main = middyfy(getProductsList);
