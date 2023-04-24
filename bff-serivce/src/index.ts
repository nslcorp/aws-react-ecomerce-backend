import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { generateUndefinedRecipientMessage } from "./config";
import { validateRootRequest } from "./handlers/validateRootRequest/validateRootRequest";
import { getRecipientUrl } from "./handlers/getRecipientServiceURL/getRecipientServiceURL";

// import type {Request, Response} from 'express'

dotenv.config();

const app: Express = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 3000;

app.all("/*", async (req: Request, res: Response, next: NextFunction) => {
  // const recipientName = req.params.recipient.toLowerCase();

  validateRootRequest(req.originalUrl, res, next);

  // url: '/'  ==> serviceName: ""
  // url: '/abc'  ==> serviceName: "abc"
  const serviceName = req.originalUrl.split("/")[1];
  const baseRecipientUrl = process.env[serviceName];
  const message = generateUndefinedRecipientMessage(serviceName);
  if (!baseRecipientUrl) {
    return res.status(502).send(message);
  }

  console.log(req.headers);

  const axiosConfig: AxiosRequestConfig = {
    method: req.method,
    // Unable to forward all headers
    // ==> AxiosError: write EPROTO 8621808448:error:14094410:SSL routines:ssl3_read_bytes:sslv3 alert handshake
    headers: {
      ...(req.headers.authorization && {
        Authorization: req.headers.authorization,
      }),
    },
    url: getRecipientUrl(serviceName, baseRecipientUrl, req.originalUrl),
    ...(Object.keys(req.body || {}).length > 0 && { data: req.body }),
  };
  console.log(axiosConfig);

  try {
    const response = await axios(axiosConfig);
    res.json(response.data);
  } catch (error: any) {
    if (!error.response) {
      console.error(error);
      return res
        .status(500)
        .send("Unprocessed backend error. See details in log.");
    }
    return res.status(error.response.status).json(error.response.data);
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
