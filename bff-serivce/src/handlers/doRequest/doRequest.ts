import axios, { AxiosRequestHeaders } from 'axios';
import { getAxiosConfig } from '../getAxiosConfig/getAxiosConfig';
import { NextFunction, Request, Response } from 'express';
import { sendResponse } from '../sendResponse/sendResponse';

export const doRequest = async (
  serviceName: string,
  baseRecipientUrl: string,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const config = getAxiosConfig(
    serviceName,
    baseRecipientUrl!,
    req.originalUrl,
    req.headers as AxiosRequestHeaders,
    req.method,
    req.body,
  );

  try {
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    if (!error.response) {
      console.log(error);
      sendResponse({ status: 500, message: 'Unhandled error.' }, res, next);
      return;
    }

    const respData = {
      status: error.response.status,
      data: error.response.data,
    };
    sendResponse(respData, res, next);
  }
};
