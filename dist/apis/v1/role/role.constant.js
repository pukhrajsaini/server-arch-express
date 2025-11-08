"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLES = exports.ApiActions = exports.AppModules = void 0;
var AppModules;
(function (AppModules) {
    AppModules["Admin"] = "ADMIN";
    AppModules["User"] = "USER";
    AppModules["Restaurant"] = "RESTAURANT";
    AppModules["Dashboard"] = "DASHBOARD";
    AppModules["DeviceManagement"] = "DEVICE_MANAGEMENT";
    AppModules["DeviceStatics"] = "DEVICE_STATICS";
    AppModules["Settings"] = "SETTINGS";
    AppModules["Notification"] = "NOTIFICATION";
})(AppModules || (exports.AppModules = AppModules = {}));
var ApiActions;
(function (ApiActions) {
    ApiActions["Create"] = "CREATE";
    ApiActions["Read"] = "READ";
    ApiActions["Update"] = "UPDATE";
    ApiActions["Delete"] = "DELETE";
    ApiActions["Status"] = "STATUS";
})(ApiActions || (exports.ApiActions = ApiActions = {}));
exports.ROLES = [
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
];
