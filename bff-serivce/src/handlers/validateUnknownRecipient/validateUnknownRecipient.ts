import { NextFunction, Response } from "express";

// url: '/'  ==> serviceName: ""
// url: '/abc'  ==> serviceName: "abc"
export const validateUnknownRecipient = (
  baseUrl: string | undefined,
  serviceName: string,
  res: Response,
  next: NextFunction
) => {
  if (!baseUrl) {
    res.status(502).send(`Cannot process requests. 
        Details: bff can not find recipient url for '${serviceName}-service'. Please check env variables.`);
    next()
  }
};
