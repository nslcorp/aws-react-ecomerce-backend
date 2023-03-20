import { NewProductPayload } from "src/types/types";
import { SNS } from "aws-sdk";

export const sns = new SNS();

class SNSService {
  sendNotifyMessage = async (product: NewProductPayload) => {
    try {
      const message = {
        message: `Product ${product.title} successfully created`,
        body: product,
      };
      const params = {
        TopicArn: process.env.SNS_TOPIC_ARN,
        Message: JSON.stringify(message),
        Subject: "Notification from catalogBatchProcess lambda",
      };
      return await sns.publish(params).promise();
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };
}

const snsService = new SNSService();

export default snsService;
