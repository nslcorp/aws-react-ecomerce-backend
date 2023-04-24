import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

// import type {Request, Response} from 'express'

dotenv.config();

const app: Express = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 3000;

app.all("/*", async (req, res) => {
  // const recipientName = req.params.recipient.toLowerCase();

  if (req.originalUrl === "/") {
    res.send(`Welcome to BFF service. 
    You just requested root route '/' and ... it looks it doesn't add up. 
    Please use /products or /carts routes to use the power off BFF `);
  }

  // url: '/'  ==> serviceName: ""
  // url: '/abc'  ==> serviceName: "abc"
  const serviceName = req.originalUrl.split("/")[1];
  const recipientService = process.env[serviceName];
  if (!recipientService) {
    return res
      .status(502)
      .send(
        `Cannot process requests. 
        Details: bff can not find recipient url for '${serviceName} service'. Please check env variables.`
      );
  }

  const axiosConfig: AxiosRequestConfig = {
    method: req.method,
    // headers: req.headers,
    ...(Object.keys(req.body || {}).length > 0 && { data: req.body }),
  };

  console.log(req.originalUrl, req.originalUrl.split("/"));
  // console.log(serviceUrl);

  if (req.originalUrl.startsWith("/products")) {
    const baseURL = process.env.PRODUCT_SERVICE_URL;
    const url = `${baseURL}${req.originalUrl}`;
    axiosConfig.url = url;
  } else if (req.originalUrl.startsWith("/cart")) {
    const baseURL = process.env.PRODUCT_SERVICE_URL;
    const url = `${baseURL}${req.originalUrl}`;
    axiosConfig.url = url;
  }

  console.log(axiosConfig);

  try {
    const response = await axios(axiosConfig);
    res.json(response.data);
  } catch (error: any) {
    // console.log(error);
    console.log(error.message);
    res.status(400).json(error);
  }

  // res.json({
  //   urlOriginal: req.originalUrl,
  //   url: req.url,
  //   params: req.params,
  //   query: req.query,
  //   body: req.body,
  //   method: req.method,
  //   services,
  //   axiosConfig
  // });
});

// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server');
// });

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
