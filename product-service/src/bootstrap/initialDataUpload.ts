import * as dotenv from 'dotenv';
dotenv.config();
import DynamoDBService from 'src/services/DynamoDBService';

(async() => {
  await DynamoDBService.initialDataUpload();
})()
