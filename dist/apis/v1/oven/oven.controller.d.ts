import { NextFunction } from "express";
import { IRequest, IResponse } from "../../../interfaces";
declare class OvenController {
    startOven(req: IRequest, res: IResponse, next: NextFunction): Promise<void>;
    stopOven(req: IRequest, res: IResponse, next: NextFunction): Promise<void>;
    ovenVersion(req: IRequest, res: IResponse, next: NextFunction): Promise<void>;
    ovenStatus(req: IRequest, res: IResponse, next: NextFunction): Promise<void>;
    ovenTemperatures(req: IRequest, res: IResponse, next: NextFunction): Promise<void>;
    sendCustomCommand(req: IRequest, res: IResponse, next: NextFunction): Promise<void>;
    getPIDControllers(req: IRequest, res: IResponse, next: NextFunction): Promise<void>;
    getActiveZones(req: IRequest, res: IResponse, next: NextFunction): Promise<void>;
    getRawState(req: IRequest, res: IResponse, next: NextFunction): Promise<void>;
    getConnectionStatus(req: IRequest, res: IResponse, next: NextFunction): Promise<void>;
    initializeConnection(req: IRequest, res: IResponse, next: NextFunction): Promise<void>;
    shutdownConnection(req: IRequest, res: IResponse, next: NextFunction): Promise<void>;
    healthCheck(req: IRequest, res: IResponse, next: NextFunction): Promise<void>;
    getTemperatureZone(req: IRequest, res: IResponse, next: NextFunction): Promise<void>;
    setTemperatureSetpoint(req: IRequest, res: IResponse, next: NextFunction): Promise<void>;
    setDomeTemperature(req: IRequest, res: IResponse, next: NextFunction): Promise<void>;
    setPlateTemperature(req: IRequest, res: IResponse, next: NextFunction): Promise<void>;
    setZoneStatus(req: IRequest, res: IResponse, next: NextFunction): Promise<void>;
    setAutoIgnitionTime(req: IRequest, res: IResponse, next: NextFunction): Promise<void>;
    setPIDParameter(req: IRequest, res: IResponse, next: NextFunction): Promise<void>;
    startThermocoupleCompensation(req: IRequest, res: IResponse, next: NextFunction): Promise<void>;
    startAutoTuning(req: IRequest, res: IResponse, next: NextFunction): Promise<void>;
}
declare const _default: OvenController;
export default _default;
