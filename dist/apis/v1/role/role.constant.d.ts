export declare enum AppModules {
    Admin = "ADMIN",
    User = "USER",
    Restaurant = "RESTAURANT",
    Dashboard = "DASHBOARD",
    DeviceManagement = "DEVICE_MANAGEMENT",
    DeviceStatics = "DEVICE_STATICS",
    Settings = "SETTINGS",
    Notification = "NOTIFICATION"
}
export declare enum ApiActions {
    Create = "CREATE",
    Read = "READ",
    Update = "UPDATE",
    Delete = "DELETE",
    Status = "STATUS"
}
export declare const ROLES: {
    name: string;
    permissions: AppModules[];
}[];
