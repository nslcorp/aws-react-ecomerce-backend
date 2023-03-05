import { DataBaseError } from 'src/errors/DataBaseError';
import { dynamodbClient } from 'src/services/DynamoDBService/handlers/shared/dynamodbClient';
import { NewProductPayload, ProductDynamoSchema } from 'src/types/types';


export const createProduct = async (data: NewProductPayload, productId: string) => {
  try {
    const product: ProductDynamoSchema = {
      id: productId,
      ...data
    }

    return await dynamodbClient.put({
      TableName: process.env.TABLE_PRODUCTS,
      Item: product
    }).promise()

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
