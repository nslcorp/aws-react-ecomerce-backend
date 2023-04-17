// using dotenv here because it works both for Serverless and Nest
import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import helmet from 'helmet';
import { AppModule } from './app.module';
import type { Callback, Context, Handler } from 'aws-lambda';

let server: Handler;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: (req, callback) => callback(null, true),
  });
  app.use(helmet());
  await app.init();

  // Run in Nest development mode
  // const port = 4000;
  // await app.listen(port);

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}
// Run in Nest development mode
// bootstrap();

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
