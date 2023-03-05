import { DataBaseError } from 'src/errors/DataBaseError';
import { dynamodbClient } from 'src/services/DynamoDBService/handlers/shared/dynamodbClient';
import { NewProductPayload, Stock } from 'src/types/types';


export const createStock = async (data: NewProductPayload, productId: string) => {
  const stock: Stock = {
    productId,
    count: data.count
  }

  try {
    await dynamodbClient.put({
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
