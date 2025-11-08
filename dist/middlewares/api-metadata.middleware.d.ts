import { NextFunction } from "express";
import { ApiActions, AppModules } from "../apis/v1/role/role.constant";
import { IRequest, IResponse } from "../interfaces";
import { ApiAccess } from "../apis/api.constant";
export interface IApiMetadata {
    module: AppModules;
    actions: ApiActions;
    access: ApiAccess;
}
export declare function setApiMetadata(metadata: IApiMetadata): (req: IRequest, res: IResponse, next: NextFunction) => void;
