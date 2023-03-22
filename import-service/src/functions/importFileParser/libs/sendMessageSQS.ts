import { getAppVariables } from '@libs/getAppConstants';
import { SQS } from 'aws-sdk';

const sqs = new SQS();
const { sqsUrl } = getAppVariables();
export const sendMessageSQS = (data) => {
  const sqsParams = {
    MessageBody: JSON.stringify(data),
    QueueUrl: sqsUrl,
  };
  return sqs.sendMessage(sqsParams).promise();
};
