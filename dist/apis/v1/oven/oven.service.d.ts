import { ServiceResponse } from "../../../interfaces";
import { LoggerUtil } from "../../../utils";
export declare class OvenService {
    logger: LoggerUtil;
    startOven(): Promise<ServiceResponse>;
    stopOven(): Promise<ServiceResponse>;
    ovenVersion(): Promise<ServiceResponse>;
    ovenStatus(): Promise<ServiceResponse>;
    ovenTemperatures(): Promise<ServiceResponse>;
    sendCustomCommand(command: string): Promise<ServiceResponse>;
    getPIDControllers(): Promise<ServiceResponse>;
    getActiveZones(): Promise<ServiceResponse>;
    setDomeTemperature(temperature: number): Promise<ServiceResponse>;
    setPlateTemperature(temperature: number): Promise<ServiceResponse>;
    setZoneStatus(zone: number, include: boolean): Promise<ServiceResponse>;
    setAutoIgnitionTime(hour: number, minute: number): Promise<ServiceResponse>;
    setPIDParameter(zone: number, parameter: 'P' | 'I' | 'D', value: number): Promise<ServiceResponse>;
    startThermocoupleCompensation(): Promise<ServiceResponse>;
    startAutoTuning(): Promise<ServiceResponse>;
    private parseOverloadStatus;
    private parseOvertempStatus;
    private waitForStateUpdate;
    initialize(): Promise<boolean>;
    isConnected(): boolean;
    shutdown(): Promise<void>;
    getRawState(): Promise<ServiceResponse>;
}
declare const _default: OvenService;
export default _default;
