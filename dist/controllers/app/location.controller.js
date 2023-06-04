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
const process_1 = require("process");
const location_model_1 = require("../../models/location.model");
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
class LocationController {
    /**
    * @api {get} /api/v1//app/location/location-list Location List
    * @apiHeader {String} App-Version Version Code 1.0.0.
    * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
    * @apiVersion 1.0.0
    * @apiName location-list
    * @apiGroup App
    * @apiDescription pass token inheader
    * @apiSuccessExample {json} Success-Response:
    {"status":200,"statusText":"SUCCESS","message":"locations","data":{"locationData":[{"geolocation":{"coordinates":[[28.83546,77.32732]]},"_id":"63a4275118fb30af5f7d8403","locationName":"Noida","locationType":"Home","locationAddress":"H-221 noida sec 63 Uttarpradesh","locationPhoneNumber":"9623567489","locationEmail":"jon@gmail.com","custom1":"building 21","custom2":"1st floor","__v":0},{"geolocation":{"coordinates":[[28.81546,77.32032]]},"_id":"63a4287151029762015d4c21","locationName":"Merath","locationType":"Home","locationAddress":"H-221 Merath Sec-22 Uttarpradesh","locationPhoneNumber":"9623567489","locationEmail":"jondoe@gmail.com","custom1":"building 21","custom2":"1st floor","__v":0}],"execTime":128}}
    * */
    locationList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const locationData = yield location_model_1.default.find();
                res.logMsg = `locations List`;
                return ResponseHelper_1.default.ok(res, res.__('locations'), { locationData });
            }
            catch (error) {
                (0, process_1.nextTick)(error);
            }
        });
    }
}
exports.default = new LocationController();
