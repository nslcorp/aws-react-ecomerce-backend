import { SQSEvent, SQSRecord } from "aws-lambda";
import mongodbService from "src/services/DynamoDBService";
import snsService from "src/services/SNSService";
import { main as catalogBatchProcess } from "../handler";

describe("describe block first test", () => {
  jest.spyOn(global.console, "log").mockImplementation();
  jest
    .spyOn(mongodbService, "createProduct")
    .mockResolvedValue(null);
  jest.spyOn(snsService, "sendNotifyMessage");

  it("triggered with empty Records", () => {
    const event: SQSEvent = { Records: [] };
    catalogBatchProcess(event);

    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toBeCalledWith(
      "Error: catalogBatchProcess was triggered, but no messages received"
    );

    expect(mongodbService.createProduct).not.toBeCalled();
  });

  it("successful process single message record", async () => {
    const product = {
      title: "Book one",
      description: "A good book",
      count: "10",
      author: "Author name",
      genre: "detective",
      img: "src:/to-image",
      price: "100",
    };
    const productMessage = JSON.stringify(product);
    const records = [{ ...({} as SQSRecord), body: productMessage }];
    const event: SQSEvent = { Records: records };

    await catalogBatchProcess(event);

    expect(console.log).toBeCalledWith(
      expect.objectContaining({ message: "NewProduct to be created" })
    );

    expect(mongodbService.createProduct).toBeCalledTimes(1);
    expect(snsService.sendNotifyMessage).toBeCalledTimes(1);
  });
});
