import { SQSEvent } from "aws-lambda";
import mongodbService from "src/services/DynamoDBService";
import snsService from "src/services/SNSService";
import { NewProductPayload } from "src/types/types";

const catalogBatchProcess = async (event: SQSEvent) => {
  if (event.Records.length === 0) {
    console.log(
      "Error: catalogBatchProcess was triggered, but no messages received"
    );
    return;
  }

  try {
    for (const record of event.Records) {
      const { description, title, price, count, author, img, genre } =
        JSON.parse(record.body);
      const newProduct: NewProductPayload = {
        title: title.trim(),
        description: description.trim(),
        author: author.trim(),
        genre: genre.trim(),
        img: img.trim(),
        price: Number(price.trim()),
        count: Number(count.trim()),
      };

      console.log({message: "NewProduct to be created", payload: newProduct});

      await mongodbService.createProduct(newProduct);

      await snsService.sendNotifyMessage(newProduct);
      console.log(`Product ${title} successfully saved to DB`);
    }

    console.log(
      `All ${event.Records.length + 1} batches completed successfully.`
    );
  } catch (error) {
    console.log("Fatal error. See details: ", error.message);
    console.log(error);
  }
};

export const main = catalogBatchProcess;
