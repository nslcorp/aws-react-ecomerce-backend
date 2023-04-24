import { NextFunction, Response } from "express";
export const validateRootRequest = (url: string, res: Response, next: NextFunction) => {
  if (url === "/") {
    res.send(`Welcome to BFF service. 
    You just requested root route '/' and ... it looks it doesn't add up. 
    Please use /products or /carts routes to use the power off BFF`);
    next()
  }
}