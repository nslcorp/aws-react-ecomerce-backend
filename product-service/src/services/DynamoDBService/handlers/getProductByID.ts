import { DataBaseError } from 'src/errors/DataBaseError';
import { dynamodbClient } from 'src/services/DynamoDBService/handlers/shared/dynamodbClient';
import { ProductDynamoSchema } from 'src/types/types';
// import {  ProductDynamoSchema } from 'src/types/types';

export const getProductByID = async (id: string): Promise<ProductDynamoSchema> => {

  try {
    const response = await dynamodbClient.query({
      TableName: process.env.TABLE_PRODUCTS,
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {':id': id},
    }).promise();

    const product = response.Items[0] as ProductDynamoSchema
    return product

  } catch (error) {
    const prefix = '[Products DB Error]: '
    if (error.message) {
      const message = [prefix, error.message].join("")
      throw new DataBaseError(message)
    }
    const message = [prefix, 'unhandled error. See details in console.'].join("")
    throw new DataBaseError(message)
  }

}
