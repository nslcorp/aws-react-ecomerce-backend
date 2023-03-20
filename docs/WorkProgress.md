


## Task 6
1. [product-service]: created `catalogBatchProcess` lambda that is triggered by SQS event
2. [product-service]: created SQS service `catalogItemsQueue`
3. [product-service]: `catalogBatchProcess` iterates throw all `Resources` and create Product at DB

4. [import-service]: updated `importFileParser`, so it sends each CSV record parsed from file to SQS
5. [product-service]: created `createProductTopic` and email subscription. Once product is added to DB - there is notification to Email about success.

```
* fixed issue with `useDotEnv`
Reason: it also needed forward ref using: TABLE_STOCKS: "${env:TABLE_STOCKS}",
```




