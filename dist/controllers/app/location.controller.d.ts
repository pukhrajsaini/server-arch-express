import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
declare class LocationController {
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
    locationList(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: LocationController;
export default _default;
