import { NextFunction, Response } from "express";

interface ResponseData {
  status: number;
  message?: string;
  data?: any;
}
export const sendResponse = (
  responseData: ResponseData,
  res: Response,
  next: NextFunction
) => {
  if (responseData.message) {
    res.status(responseData.status).send(responseData.message);
    next();
    return;
  }

  res.status(responseData.status).json(responseData.data);
  next();
  return;
};
