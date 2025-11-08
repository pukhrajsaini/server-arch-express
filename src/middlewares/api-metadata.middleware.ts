import { NextFunction } from "express";
import { ApiActions, AppModules } from "../apis/v1/role/role.constant";
import { IRequest, IResponse } from "../interfaces";
import { ApiAccess } from "../apis/api.constant";

export interface IApiMetadata{
    module: AppModules,
    actions: ApiActions,
    access: ApiAccess,
}
export function setApiMetadata(metadata: IApiMetadata){
    return (req: IRequest, res:IResponse, next: NextFunction) => {
        req.metadata = metadata;
        next();
    }

}