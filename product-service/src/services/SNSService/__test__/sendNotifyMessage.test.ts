import snsService, { sns } from "src/services/SNSService";
import { NewProductPayload } from "src/types/types";

jest.mock("aws-sdk", () => ({
  SNS: jest.fn().mockImplementation(function () {
    this.publish = jest.fn().mockReturnValue({ promise: jest.fn() });
  }),
}));

describe("sendNotifyMessage", () => {
  it("SNS service is triggered", () => {
    const product: NewProductPayload = {
      title: "Book one",
      description: "A good book",
      count: 10,
      author: "Author name",
      genre: "detective",
      img: "src:/to-image",
      price: 10,
    };

    snsService.sendNotifyMessage(product);

    expect(sns.publish).toHaveBeenCalledWith(
      expect.objectContaining({
        Subject: "Notification from catalogBatchProcess lambda",
      })
    );
  });

});
