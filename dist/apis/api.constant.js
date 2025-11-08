"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiAccess = void 0;
var ApiAccess;
(function (ApiAccess) {
    ApiAccess[ApiAccess["Admin"] = 1] = "Admin";
    ApiAccess[ApiAccess["User"] = 2] = "User";
    ApiAccess[ApiAccess["Global"] = 0] = "Global";
})(ApiAccess || (exports.ApiAccess = ApiAccess = {}));
