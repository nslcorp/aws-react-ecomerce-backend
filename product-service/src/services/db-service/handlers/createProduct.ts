import { DynamoDB } from 'aws-sdk';
import { DataBaseError } from '../../../errors/DataBaseError';
import { NewProductPayload, ProductDynamoSchema } from '../../../types/types';

const dynamodb = new DynamoDB.DocumentClient();

export const createProduct = async (data: NewProductPayload, productId: string) => {
  try {
    const product: ProductDynamoSchema = {
      id: productId,
      title: data.title,
      description: data.description,
      price: data.price
    }
    console.log('createProduct', product)

    return await dynamodb.put({
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
