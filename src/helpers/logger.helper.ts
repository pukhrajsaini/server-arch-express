import { NextFunction } from "express";
import DataDog from "../utils/logger.util";
import { IRequest, IResponse } from "../interfaces/req";


export const logger = (req: IRequest, res: IResponse, next: NextFunction) => {
  const logger = new DataDog(req);
  logger.request();
  res.logger = logger;
  next();
}