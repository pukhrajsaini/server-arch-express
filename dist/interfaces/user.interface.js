"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserType = exports.Approved = void 0;
var Approved;
(function (Approved) {
    Approved[Approved["approved"] = 1] = "approved";
    Approved[Approved["reject"] = 2] = "reject";
    Approved[Approved["noAction"] = 3] = "noAction";
})(Approved = exports.Approved || (exports.Approved = {}));
var UserType;
(function (UserType) {
    UserType[UserType["addedByAdmin"] = 1] = "addedByAdmin";
    UserType[UserType["selfRegister"] = 2] = "selfRegister";
})(UserType = exports.UserType || (exports.UserType = {}));
