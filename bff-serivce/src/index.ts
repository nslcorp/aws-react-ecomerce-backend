import dotenv from 'dotenv';
dotenv.config();
import express, { Express, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import NodeCache from 'node-cache';
import { validateRootRequest } from './handlers/validateRootRequest/validateRootRequest';
import { validateUnknownRecipient } from './handlers/validateUnknownRecipient/validateUnknownRecipient';
import { doRequest } from './handlers/doRequest/doRequest';
import { sendResponse } from './handlers/sendResponse/sendResponse';

const appCache = new NodeCache({ checkperiod: 120 });

const app: Express = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 3000;

app.all('/*', async (req: Request, res: Response, next: NextFunction) => {
  // const recipientName = req.params.recipient.toLowerCase();

  validateRootRequest(req.originalUrl, res, next);

  const serviceName = req.originalUrl.split('/')[1];
  const baseRecipientUrl = process.env[serviceName];
  validateUnknownRecipient(baseRecipientUrl, serviceName, res, next);

  // specific request logic comes here
  if (serviceName === 'products' && req.originalUrl === '/products') {
    const key = [req.method, req.originalUrl].join('');
    const cachedResponse = appCache.get(key);

    if (cachedResponse) {
      sendResponse({ status: 200, data: cachedResponse }, res, next);
      console.log('[Cache] response from cache');
      return;
    }
    const response = await doRequest(serviceName, baseRecipientUrl!, req, res, next);
    appCache.set(key, response, 2 * 60);
    console.log(`[Cache] response "${key}" was to cache at: ${new Date().toISOString()}`);

    sendResponse({ status: 200, data: response }, res, next);
    return;
  }

  const response = await doRequest(serviceName, baseRecipientUrl!, req, res, next);
  sendResponse({ status: 200, data: response }, res, next);
  return;
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
