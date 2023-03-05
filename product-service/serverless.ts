import type { AWS } from '@serverless/typescript';
import * as dotenv from 'dotenv';
import getProductsList from '@functions/getProductsList';
import getProductsById from '@functions/getProductsById';
import createProduct from '@functions/createProduct';
dotenv.config();

const serverlessConfiguration: AWS = {
  service: 'book-shop-product-service',
  frameworkVersion: '3',
  plugins: ['serverless-auto-swagger', 'serverless-esbuild', 'serverless-offline'],

  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    autoswagger: {
      basePath: '/dev',
      host: '6obctl4bmf.execute-api.eu-central-1.amazonaws.com',
      typefiles: ['./src/types/types.ts'],
    }
  },

  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-central-1',
    deploymentMethod: "direct",
    versionFunctions: false,
    memorySize: 128,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      TABLE_PRODUCTS: process.env.TABLE_PRODUCTS,
      TABLE_STOCKS: process.env.TABLE_STOCKS,
    },
    iam: {
      role: "arn:aws:iam::663503730313:role/DynamoDB-full-access-role"
    }
  },
  // import the function via paths
  functions: { getProductsList, getProductsById, createProduct },
  // resources: {
  //   Resources: {
  //     BookShopProductsV1: {
  //       Type: "AWS::DynamoDB::Table",
  //       Properties: {
  //         TableName: "BookShopProductsV1"
  //       }
  //     }
  //   }
  // },
  package: { individually: true },

};

module.exports = serverlessConfiguration;
