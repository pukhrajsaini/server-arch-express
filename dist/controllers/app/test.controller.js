"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const item_interface_1 = require("../../interfaces/item.interface");
const item_cart_model_1 = require("../../models/item-cart.model");
const item_model_1 = require("../../models/item.model");
const moved_item_model_1 = require("../../models/moved-item.model");
class TestController {
    test(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield moved_item_model_1.default.deleteMany();
                yield item_cart_model_1.default.deleteMany();
                yield item_model_1.default.updateMany({}, { movingStatus: item_interface_1.MovingItem.assigned });
                return res.status(200).json({ ok: 'ok' });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new TestController();
