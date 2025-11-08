interface OvenState {
    hardwareVersion: string;
    communicationVersion: string;
    bootloaderVersion: string;
    softwareVersion: string;
    date: string;
    time: string;
    timezone: string;
    workStatus: {
        raw: string;
        decimal: number;
    };
    runAt: boolean;
    alarmStatus: boolean;
    emergencyKey: boolean;
    cronoOn: boolean;
    switchOnOff: boolean;
    tempMediaCupola: {
        raw: string;
        decimal: number;
    };
    tempMediaPlatea: {
        raw: string;
        decimal: number;
    };
    tempCompExt: {
        raw: string;
        decimal: number;
    };
    heatsinkTemp: {
        raw: string;
        decimal: number;
    };
    mainBoardTemp: {
        raw: string;
        decimal: number;
    };
    setpointCupola: {
        raw: string;
        decimal: number;
    };
    setpointFondo: {
        raw: string;
        decimal: number;
    };
    ampMax: {
        raw: string;
        decimal: number;
    };
    ampMinZona: {
        raw: string;
        decimal: number;
    };
    powerOutMode: {
        raw: string;
        decimal: number;
    };
    fornoMax: {
        raw: string;
        decimal: number;
    };
    heatsinkMax: {
        raw: string;
        decimal: number;
    };
    boardMax: {
        raw: string;
        decimal: number;
    };
    offsetGeneraleCupola: {
        raw: string;
        decimal: number;
    };
    offsetGeneralePlatea: {
        raw: string;
        decimal: number;
    };
    offsetPlatea3_4: {
        raw: string;
        decimal: number;
    };
    offsetPlatea5_6: {
        raw: string;
        decimal: number;
    };
    timerOn: {
        raw: string;
        decimal: number;
    };
    minuteOn: {
        raw: string;
        decimal: number;
    };
    rifATune: {
        raw: string;
        decimal: number;
    };
    triacError: {
        raw: string;
        decimal: number;
    };
    resistError: {
        raw: string;
        decimal: number;
    };
    overloadStatus: {
        L1: boolean;
        L2: boolean;
        L3: boolean;
        raw: string;
    };
    overtempStatus: {
        furnace: boolean;
        board: boolean;
        heatsink: boolean;
        raw: string;
    };
    tempZones: Record<string, {
        raw: string;
        decimal: number;
    }>;
    activeZones: boolean[];
    activeZonesRaw: string;
    weekDays: {
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
        saturday: boolean;
        sunday: boolean;
        raw: string;
    };
    pidControllers: Array<{
        zone: number;
        label: string;
        kp: {
            raw: string;
            decimal: number;
        };
        ki: {
            raw: string;
            decimal: number;
        };
        kd: {
            raw: string;
            decimal: number;
        };
    }>;
    commandResponse: string;
    lastUpdate: string;
    rawXml: string;
}
declare class MQTTHelper {
    private client;
    private currentDeviceId;
    private topicCmd;
    private topicState;
    private pendingRequests;
    private deviceStates;
    private stateCallbacks;
    private logger;
    private reconnectAttempts;
    private maxReconnectAttempts;
    private lastMessageTime;
    private healthCheckInterval?;
    setCurrentDevice(deviceId: string): void;
    getCurrentDeviceId(): string;
    connect(deviceId?: string): Promise<boolean>;
    private setupEventHandlers;
    private scheduleReconnect;
    private startHealthMonitor;
    private stopHealthMonitor;
    private parseXmlValue;
    private handleStateMessage;
    private parseStateData;
    private convertFieldValue;
    private notifyStateCallbacks;
    private checkPendingRequests;
    cmd(cmd: string, timeout?: number, deviceId?: string): Promise<any>;
    getDeviceState(deviceId: string): Partial<OvenState>;
    getCurrentState(): Partial<OvenState>;
    onStateUpdate(callback: (state: Partial<OvenState>, deviceId: string) => void): void;
    removeStateCallback(callback: (state: Partial<OvenState>, deviceId: string) => void): void;
    isConnected(): boolean;
    disconnect(): Promise<void>;
    powerOn(deviceId?: string): Promise<any>;
    powerOff(deviceId?: string): Promise<any>;
    setDomeTemperature(temperature: number, deviceId?: string): Promise<any>;
    setFloorTemperature(temperature: number, deviceId?: string): Promise<any>;
    setZoneTemperature(zone: number, temperature: number, deviceId?: string): Promise<any>;
    setActiveZones(zones: boolean[], deviceId?: string): Promise<any>;
    setCronoMode(enabled: boolean, deviceId?: string): Promise<any>;
    resetAlarms(deviceId?: string): Promise<any>;
    emergencyStop(deviceId?: string): Promise<any>;
    getStatus(deviceId?: string): Promise<any>;
    reboot(deviceId?: string): Promise<any>;
}
declare const MQTT: MQTTHelper;
export default MQTT;
