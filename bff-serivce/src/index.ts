import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

// import type {Request, Response} from 'express'

dotenv.config();


const app: Express = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 3000;

app.all("/*/:param", async (req, res) => {
  // const recipientName = req.params.recipient.toLowerCase();
  const url = req.originalUrl
  console.log(req.originalUrl);
  console.log(req.params);
  console.log(req.query);

  console.log( req.body);
  console.log(req.method);

  if(req.originalUrl.startsWith("/product")){

  }
  else if(req.originalUrl.startsWith("/cart")){

  }
  res.json({
    urlOriginal: req.originalUrl,
    url: req.url,
    params: req.params,
    query: req.query,
    body: req.body,
    method: req.method

  })
});

// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server');
// });

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
