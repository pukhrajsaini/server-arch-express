export enum AppModules {
    Admin = 'ADMIN',
    User = 'USER',
    Restaurant = 'RESTAURANT',
    Dashboard = 'DASHBOARD',
    DeviceManagement = 'DEVICE_MANAGEMENT',
    DeviceStatics = 'DEVICE_STATICS',
    Settings = 'SETTINGS',
    Notification = 'NOTIFICATION',
}


export enum ApiActions {
    Create = 'CREATE',
    Read = 'READ',
    Update = 'UPDATE',
    Delete = 'DELETE',
    Status = 'STATUS',
}




export const ROLES = [
    {
        name: 'SUPER_ADMIN',
        permissions: Object.values(AppModules),
    },
    {
        name: 'INSTALLER',
        permissions: [
            AppModules.Restaurant,
            AppModules.DeviceManagement,
            AppModules.DeviceStatics,
            AppModules.Settings,
        ],
    },
    {
        name: 'OPERATOR',
        permissions: [
            AppModules.Restaurant,
            AppModules.Dashboard,
            AppModules.DeviceManagement,
            AppModules.DeviceStatics,
            AppModules.Settings,
            AppModules.Notification,
        ],
    }
]