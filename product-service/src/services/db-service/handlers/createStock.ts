import { DynamoDB } from 'aws-sdk';
import { DataBaseError } from '../../../errors/DataBaseError';
import { NewProductPayload, Stock } from '../../../types/types';

const dynamodb = new DynamoDB.DocumentClient();

export const createStock = async (data: NewProductPayload, productId: string) => {
  const stock: Stock = {
    productId,
    count: data.count
  }

  try {
    await dynamodb.put({
      TableName: process.env.TABLE_STOCKS,
      Item: stock
    }).promise()

  } catch (error) {
    const prefix = '[Stock DB Error]: '
    if(error.message){
      const message = [prefix, error.message].join("")
      throw new DataBaseError(message)
    }
    const message = [prefix, 'unhandled error. See details in console.'].join("")
    throw new DataBaseError(message)
  }
}
