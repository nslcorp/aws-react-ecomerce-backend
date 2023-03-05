import { DataBaseError } from 'src/errors/DataBaseError';
import { dynamodbClient } from 'src/services/DynamoDBService/handlers/shared/dynamodbClient';
import { Stock } from 'src/types/types';

export const getStocks = async (): Promise<Stock[]> => {
  try {
    const response =  await dynamodbClient.scan({
      TableName: process.env.TABLE_STOCKS,
    }).promise()

    return response.Items as Stock[]

  } catch (error) {
    const prefix = '[Stocks DB Error]: '
    if (error.message) {
      const message = [prefix, error.message].join("")
      throw new DataBaseError(message)
    }
    const message = [prefix, 'unhandled error. See details in console.'].join("")
    throw new DataBaseError(message)
  }

}
