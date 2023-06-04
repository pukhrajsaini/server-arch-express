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
const location_model_1 = require("../../models/location.model");
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
class LocationController {
    addLocation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reqData = req.body;
                console.log(reqData);
                const locationData = {
                    locationName: reqData.locationName,
                    locationType: reqData.locationType,
                    locationAddress: reqData.locationAddress,
                    locationPhoneNumber: reqData.locationPhoneNumber,
                    locationEmail: reqData.locationEmail,
                    custom1: reqData.custom1,
                    custom2: reqData.custom2,
                    geolocation: { coordinates: [reqData.geolocation.longitude, reqData.geolocation.latitude] }
                };
                console.log(locationData);
                let location = yield location_model_1.default.create(locationData);
                res.logMsg = 'location added successfully';
                ResponseHelper_1.default.ok(res, res.__('location_added'), { location: location });
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.default = new LocationController();
