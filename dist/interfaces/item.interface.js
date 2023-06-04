"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovingItem = exports.ItemOwnerType = exports.Approved = void 0;
var Approved;
(function (Approved) {
    Approved[Approved["approved"] = 1] = "approved";
    Approved[Approved["reject"] = 2] = "reject";
    Approved[Approved["noAction"] = 3] = "noAction";
})(Approved = exports.Approved || (exports.Approved = {}));
var ItemOwnerType;
(function (ItemOwnerType) {
    ItemOwnerType[ItemOwnerType["owner"] = 1] = "owner";
    ItemOwnerType[ItemOwnerType["loaner"] = 2] = "loaner";
    ItemOwnerType[ItemOwnerType["consignment"] = 3] = "consignment";
})(ItemOwnerType = exports.ItemOwnerType || (exports.ItemOwnerType = {}));
var MovingItem;
(function (MovingItem) {
    MovingItem[MovingItem["assigned"] = 1] = "assigned";
    MovingItem[MovingItem["moving"] = 2] = "moving";
    MovingItem[MovingItem["moved"] = 3] = "moved";
    MovingItem[MovingItem["returned"] = 4] = "returned";
    MovingItem[MovingItem["addedToMove"] = 5] = "addedToMove";
})(MovingItem = exports.MovingItem || (exports.MovingItem = {}));
