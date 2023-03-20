import { DataBaseError } from 'src/errors/DataBaseError';
import { dynamodbClient } from 'src/services/DynamoDBService/handlers/shared/dynamodbClient';
import { ProductDynamoSchema } from 'src/types/types';

export const getProducts = async (): Promise<ProductDynamoSchema[]> => {
  console.log(process.env.TABLE_PRODUCTS)
  try {
    const data = await dynamodbClient.scan({
      TableName: process.env.TABLE_PRODUCTS,
    }).promise()

    return data.Items as ProductDynamoSchema[]

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
