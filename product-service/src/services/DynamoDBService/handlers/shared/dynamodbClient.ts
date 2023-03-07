import { DynamoDB } from 'aws-sdk';
const dynamodb = new DynamoDB.DocumentClient({region: process.env.AWS_REGION});

export const dynamodbClient = dynamodb
