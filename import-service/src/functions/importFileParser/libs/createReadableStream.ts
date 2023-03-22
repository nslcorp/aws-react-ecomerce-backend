import { sendMessageSQS } from '@functions/importFileParser/libs/sendMessageSQS';
import { getAppVariables } from '@libs/getAppConstants';
import { S3 } from 'aws-sdk';
import stripBom from 'strip-bom-stream';

const csvParser = require('csv-parser');

const s3 = new S3();

export const createReadableStream = (fileKey) =>
  new Promise<void>(async (resolve, reject) => {
    try {
      const { bucketName } = getAppVariables();

      const params: S3.Types.GetObjectRequest = {
        Bucket: bucketName,
        Key: fileKey,
      };
      const fileStream = await s3.getObject(params).createReadStream();

      fileStream
        .pipe(stripBom())
        .pipe(csvParser())
        .on('data', async (data) => {
          console.log('[createReadableStream] CSV parsed file record', data);
          const sqsResponse = await sendMessageSQS(data);
          console.log('sqsResponse', sqsResponse);
        })
        .on('end', () => {
          console.log('[createReadableStream] Stream closed');
          resolve();
        });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
