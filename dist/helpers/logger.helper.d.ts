import { NextFunction } from "express";
import { IRequest, IResponse } from "../interfaces/req";
export declare const logger: (req: IRequest, res: IResponse, next: NextFunction) => void;
