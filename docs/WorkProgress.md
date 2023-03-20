


## Task 6

#### changes at `product-service`
1. [product-service]: created `catalogBatchProcess` lambda that is triggered by SQS event
2. [product-service]: created SQS service `catalogItemsQueue`
3. [product-service]: `catalogBatchProcess` iterates throw all `Resources` and create Product at DB
4. [product-service]: created `createProductTopic` and email subscription. Once product is added to DB - there is notification to Email about success.
5** Introduces Jest and covered `catalogBatchProcess` with Unit Tests
6** Created second subscription `createProductSubscriptionLowPrice` and send there only messages by sertan condition

#### changes at `import-service`
1. [import-service]: updated `importFileParser`, so it sends each CSV record parsed from file to SQS
 
```
Fixed issue with `useDotEnv`
Reason: it needs forward ref using "${env:VARIABLE_NAME}" syntax",
```

```
{ Ref: "createProductTopic" }
Note: for different services returns different value. It could be Url or Arn. Need to look at doc.
Example: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sqs-queue.html#aws-resource-sqs-queue-return-values 
```




