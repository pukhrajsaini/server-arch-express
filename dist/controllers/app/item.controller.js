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
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
const item_interface_1 = require("../../interfaces/item.interface");
const item_service_1 = require("../../services/app/item.service");
const item_model_1 = require("../../models/item.model");
const item_cart_model_1 = require("../../models/item-cart.model");
const item_cart_service_1 = require("../../services/app/item-cart.service");
const moved_item_model_1 = require("../../models/moved-item.model");
const location_model_1 = require("../../models/location.model");
const moved_item_interface_1 = require("../../interfaces/moved-item.interface");
class ItemController {
    /**
    * @api {post} /api/v1/app/item/list Get Current moving list
    * @apiHeader {String} App-Version Version Code 1.0.0.
    * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.......
    * @apiVersion 1.0.0
    * @apiName get current-moving
    * @apiGroup App-Item
    * @apiSuccessExample {json} Success-Response:
    *     HTTP/1.1 200 OK
    **  {
    *  "status": 200,
    *   "statusText": "SUCCESS",
    *   "message": "Currently moving list fetched successfully",
    *  "data": {
    *  "item": {
    *      "count": 3,
    *      "list": [
    *          {
    *              "_id": "639c14bb4cbd35452e7ef6d3",
    *              "itemName": "Catheter",
    *              "itemOwner": 1,
    *              "ownerName": "sahil",
    *              "loanerName": "rohit",
    *              "consignmentName": "rohan",
    *              "itemId": "GT4498958",
    *              "baseLocation": "noida  heritage hospital",
    *              "brand": "heath care",
    *              "type": "gggg",
    *              "custom1": "dfght",
    *              "custom2": "ghht",
    *              "images": [
    *                  "item/1671173305228-download (1).jpeg"
    *              ],
    *              "isApproved": 1,
    *              "movingStatus": 2,
    *              "pdf": "itemPdf/1671173306335-SWTM-2088_Atlassian-Git-Cheatsheet.pdf",
    *              "timestamps": "1671173045619",
    *              "createdAt": "2022-12-16T06:48:27.990Z",
    *              "updatedAt": "2022-12-16T06:48:27.990Z"
    *          },
    *          {
    *              "_id": "639c144f4cbd35452e7ef6cf",
    *              "itemName": "Blood infusion set",
    *              "itemOwner": 1,
    *              "ownerName": "jatin",
    *              "loanerName": "kopal",
    *              "consignmentName": "ravi",
    *              "itemId": "GT0290714",
    *              "baseLocation": "noida  heritage hospital",
    *              "brand": "heath care",
    *              "type": "gggg",
    *              "custom1": "dfght",
    *              "custom2": "ghht",
    *              "images": [
    *                  "item/1671173196202-download (1).jpeg"
    *              ],
    *              "isApproved": 1,
    *              "movingStatus": 2,
    *              "pdf": "itemPdf/1671173197320-SWTM-2088_Atlassian-Git-Cheatsheet.pdf",
    *              "timestamps": "1671173045619",
    *              "createdAt": "2022-12-16T06:46:39.006Z",
    *              "updatedAt": "2022-12-16T06:46:39.006Z"
    *          },
    *          {
    *              "_id": "639c13e04cbd35452e7ef6cb",
    *              "itemName": "kidney dish",
    *              "itemOwner": 1,
    *              "ownerName": "ritu",
    *              "loanerName": "gaurov",
    *              "consignmentName": "kamal",
    *              "itemId": "GT4835125",
    *              "baseLocation": "noida  heritage hospital",
    *              "brand": "heath care",
    *              "type": "gggg",
    *              "custom1": "dfght",
    *              "custom2": "ghht",
    *              "images": [
    *                  "item/1671173085931-download (1).jpeg"
    *              ],
    *              "isApproved": 1,
    *              "movingStatus": 2,
    *              "pdf": "itemPdf/1671173087052-SWTM-2088_Atlassian-Git-Cheatsheet.pdf",
    *              "timestamps": "1671173045619",
    *              "createdAt": "2022-12-16T06:44:48.760Z",
    *              "updatedAt": "2022-12-16T06:44:48.760Z"
    *          }
    *      ]
    *    },
    *    "execTime": 120
    *   }
    *    }
    *      **/
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user._id;
                const queryString = req.query;
                const item = yield item_service_1.default.list(userId, queryString);
                res.logMsg = `Currently moving list fetched successfully`;
                return ResponseHelper_1.default.ok(res, res.__(' current_moving_list'), { item });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
       * @api {get} /api/v1/app/item/moving-items Item cart list (moving item cart)
       * @apiHeader {String} App-Version Version Code 1.0.0.
       * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
       * @apiVersion 1.0.0
       * @apiName moving-items
       * @apiGroup App-Item
       * @apiSuccessExample {json} Success-Response:
       *  HTTP/1.1 200 OK
        *            {
        *        "status": 200,
        *        "statusText": "SUCCESS",
        *        "message": "Item detail fetched successfully",
        *        "data": {
        *            "movingItems": [
        *                {
        *                    "_id": "63a1b34079564193eb5e2f0e",
        *                    "itemId": "639c455327a9d0bf65686968",
        *                    "userId": "639abbc9f731ec47dc21dd33",
        *                    "item": {
        *                        "_id": "639c455327a9d0bf65686968",
        *                        "itemName": "Catheter",
        *                        "itemOwner": 1,
        *                        "ownerName": "sahil",
        *                        "loanerName": "rohit",
        *                        "consignmentName": "rohan",
        *                        "itemId": "GT2850705",
        *                        "baseLocation": "noida  heritage hospital",
        *                        "brand": "heath care",
        *                        "type": "gggg",
        *                        "images": [
        *                            "item/1671185744398-download (1).jpeg"
        *                        ],
        *                        "isApproved": 1,
        *                        "borrowerId": "639abbc9f731ec47dc21dd33",
        *                        "movingStatus": 5,
        *                        "pdf": "itemPdf/1671185745609-SWTM-2088_Atlassian-Git-Cheatsheet.pdf",
        *                        "createdAt": "2022-12-16T10:15:47.848Z",
        *                        "updatedAt": "2022-12-16T10:15:47.848Z",
        *                        "borrower": {
        *                            "_id": "639abbc9f731ec47dc21dd33",
        *                            "name": "Ashish Verma"
        *                        }
        *                    }
        *                }
        *            ],
        *            "execTime": 142
        *        }
        *    }
       *    */
    movingItemsDetails(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const movingItems = yield item_cart_service_1.default.movingItemsDetails(user);
                res.logMsg = 'Moving item list fetched successfully for user *${user._id}*';
                return ResponseHelper_1.default.ok(res, res.__('item_details'), { movingItems });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
           * @api {delete} /api/v1/app/item/delete-item/:itemId Delete item from  (moving item cart)
           * @apiHeader {String} App-Version Version Code 1.0.0.
           * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
           * @apiVersion 1.0.0
           * @apiName delete-item
           * @apiGroup App-Item
           *
           * @apiParam {String} itemId item's _id
           * @apiDescription pass item id as params
           * @apiSuccessExample {json} Success-Response:
           *  HTTP/1.1 200 OK
           *  {
           *        "status": 200,
           *        "statusText": "SUCCESS",
           *        "message": "Item removed from item cart",
           *        "data": {
           *            "cartItem": {
           *                "_id": "63a1b34079564193eb5e2f0e",
           *                "itemId": "639c455327a9d0bf65686968",
           *                "userId": "639abbc9f731ec47dc21dd33",
           *                "images": [],
           *                "createdAt": "2022-12-20T13:06:08.465Z",
           *                "updatedAt": "2022-12-20T13:06:08.465Z",
           *                "__v": 0
           *            },
           *            "execTime": 857
           *        }
           *    }
           *
           **/
    removeItemFromItemCart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const itemId = req.params.id;
                const cartItem = yield item_cart_model_1.default.findOne({ userId: user._id, itemId });
                if (!cartItem)
                    return ResponseHelper_1.default.badRequest(res, res.__('invalid_item_id'));
                yield item_model_1.default.findByIdAndUpdate(cartItem.itemId, { movingStatus: item_interface_1.MovingItem.assigned });
                yield cartItem.delete();
                res.logMsg = `Item *${itemId}* removed from cart successfully`;
                return ResponseHelper_1.default.ok(res, res.__('item_removed_form_item_cart'), { cartItem });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
        * @api {post} /api/v1/app/item/add-moving-item Add Moving Item
        * @apiHeader {String} App-Version Version Code 1.0.0.
        * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
        * @apiVersion 1.0.0
        * @apiName add-moving-item
        * @apiGroup App-Item
        * @apiDescription pass item _id in body
        * @apiSuccessExample {json} Success-Response:
        {"status":200,"statusText":"SUCCESS","message":"Item moved successfully","data":{"itemCartData":{"itemId":"639c37aa9f58487830d8f722","userId":"63a0a7a4f0657fbae0ed7286","images":[],"_id":"63a169a4de2dce09585b5093","createdAt":"2022-12-20T07:52:04.460Z","updatedAt":"2022-12-20T07:52:04.460Z","__v":0},"execTime":222}}
        * */
    addMovingItem(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user._id;
                const { itemId } = req.body;
                let itemData = yield item_model_1.default.findById(itemId);
                if (!itemData) {
                    return ResponseHelper_1.default.badRequest(res, res.__('invalid_item_id'));
                }
                if (itemData.movingStatus === item_interface_1.MovingItem.addedToMove)
                    return ResponseHelper_1.default.conflict(res, res.__('item_already_added_to_move'));
                itemData.movingStatus = item_interface_1.MovingItem.addedToMove;
                itemData.save();
                const itemCartData = yield item_cart_model_1.default.create({ 'userId': userId, 'itemId': itemData._id });
                res.logMsg = `Item moved successfully`;
                return ResponseHelper_1.default.ok(res, res.__('item_moved_successfully'), { itemCartData });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
            * @api {post} /api/v1/app/item/add-images Add images to moving cart's items
            * @apiHeader {String} App-Version Version Code 1.0.0.
            * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
            * @apiVersion 1.0.0
            * @apiName add-images
            * @apiGroup App-Item
            * @apiDescription pass data as formData, items's _id as key and relative images as value of item's id
            * @apiSuccessExample {json} Success-Response:
            *
            * {
            *        "status": 200,
            *        "statusText": "SUCCESS",
            *        "message": "Images uploaded successfully",
            *        "data": {
            *            "execTime": 4614
            *        }
            *    }
            * */
    uploadPhotosOnCartItems(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const logger = res.logger;
                const user = req.user;
                const files = req.files;
                if (Object.keys(req.body).length)
                    return ResponseHelper_1.default.badRequest(res, res.__('one_image_required'));
                const result = yield item_cart_service_1.default.uploadMovingCartImages(files, user, logger);
                if (result.validationFailed)
                    return ResponseHelper_1.default.badRequest(res, res.__('one_image_required'));
                if (result.isValidObjectId)
                    return ResponseHelper_1.default.badRequest(res, res.__('invalid_object_id_items'));
                res.logMsg = "Item's cart images uploaded successfully";
                return ResponseHelper_1.default.ok(res, res.__('images_uploaded_successfully'), {});
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
            * @api {delete} /api/v1/app/item/clear-cart Remove all item from cart's items
            * @apiHeader {String} App-Version Version Code 1.0.0.
            * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
            * @apiVersion 1.0.0
            * @apiName clear-cart
            * @apiGroup App-Item
            * @apiSuccessExample {json} Success-Response:
            *
            * {
            *        "status": 200,
            *        "statusText": "SUCCESS",
            *        "message": "Cart cleared",
            *        "data": {
            *            "execTime": 4614
            *        }
            *    }
            * */
    clearCart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const logger = res.logger;
                const user = req.user;
                const carts = yield item_cart_model_1.default.find({ userId: user._id });
                yield item_model_1.default.updateMany({
                    _id: {
                        '$in': carts.map((e) => e = e.itemId)
                    }
                }, { movingStatus: item_interface_1.MovingItem.assigned });
                yield item_cart_model_1.default.deleteMany({ userId: user._id });
                res.logMsg = "Item's cart images uploaded successfully";
                return ResponseHelper_1.default.ok(res, res.__('images_uploaded_successfully'), {});
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
           * @api {post} /api/v1/app/item/moved-item Add item in moved items
           * @apiHeader {String} App-Version Version Code 1.0.0.
           * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
           * @apiVersion 1.0.0
           * @apiName moved-item
           * @apiGroup App-Item
           * @apiDescription pass data as jsonData, items's _id as key and relative images as value of item's id
           * @apiSuccessExample {json} Success-Response:
           *
           * {"status":200,"statusText":"SUCCESS","message":"Item moved successfully","data":{"movedItem":{"userId":"63a0a7a4f0657fbae0ed7286","surgeryDate":"2022-12-22T00:00:00.000Z","surgonName":"Ramlaal","location":{"_id":"63a4275118fb30af5f7d8403","locationName":"Noida","locationType":"Home","locationAddress":"H-221 noida sec 63 Uttarpradesh","locationPhoneNumber":"9623567489","locationEmail":"jon@gmail.com","custom1":"building 21","custom2":"1st floor"},"items":[{"_id":"639c37aa9f58487830d8f722","itemName":"Catheter","itemOwner":"1","ownerName":"sahil","loanerName":"rohit","consignmentName":"rohan","itemId":"GT0618082","baseLocation":"noida  heritage hospital","brand":"heath care","type":"gggg","custom1":"dfght","custom2":"ghht","images":["item/1671182248076-download (1).jpeg"],"borrower":{"_id":"639abbc9f731ec47dc21dd33","name":"Ashish Verma"}}],"_id":"63a700c73c0732d71fde67fb","__v":0},"execTime":231}}
           * */
    movedItem(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { locationId, surgonName, surgeryDate } = req.body;
                const itemCartData = yield item_cart_model_1.default.find({ userId: req.user._id });
                console.log('item cart data', itemCartData);
                const locationData = yield location_model_1.default.findById(locationId);
                const location = {
                    _id: locationData._id,
                    locationName: locationData.locationName,
                    locationType: locationData.locationType,
                    locationAddress: locationData.locationAddress,
                    locationPhoneNumber: locationData.locationPhoneNumber,
                    locationEmail: locationData.locationEmail,
                    custom1: locationData.custom1,
                    custom2: locationData.custom2
                };
                const movedData = {
                    userId: req.user._id,
                    surgonName: surgonName,
                    surgeryDate: surgeryDate,
                    location: location,
                };
                for (const cartItem of itemCartData) {
                    const itemData = yield item_model_1.default.findById(cartItem.itemId);
                    if (itemData) {
                        itemData.movingStatus = item_interface_1.MovingItem.moving;
                        yield itemData.save();
                    }
                    console.log('Updating moved item');
                    const obj = {
                        _id: itemData._id,
                        itemName: itemData.itemName,
                        itemOwner: itemData.itemOwner,
                        ownerName: itemData.ownerName,
                        loanerName: itemData.loanerName,
                        consignmentName: itemData.consignmentName,
                        itemId: itemData.itemId,
                        baseLocation: itemData.baseLocation,
                        brand: itemData.brand,
                        type: itemData.type,
                        custom1: itemData.custom1,
                        custom2: itemData.custom2,
                        images: itemData.images,
                        borrower: {
                            _id: itemData.borrowerId,
                            name: req.user.name,
                            images: [...cartItem.images]
                        }
                    };
                    yield moved_item_model_1.default.create(Object.assign(Object.assign({}, movedData), { itemId: cartItem.itemId, item: obj }));
                    yield item_cart_model_1.default.deleteOne({ itemId: cartItem.itemId, userId: req.user._id });
                }
                res.logMsg = "Item moved successfully";
                return ResponseHelper_1.default.ok(res, res.__('item_moved_successfully'), {});
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
           * @api {patch} /api/v1/app/item/end-process/:itemId End Item's process
           * @apiHeader {String} App-Version Version Code 1.0.0.
           * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
           * @apiVersion 1.0.0
           * @apiName end-process
           * @apiGroup App-Item
           * @apiParam {String} itemId item's _id
           * @apiDescription pass data as formData, itemId as params and body multipart form data on receivedImages key
           * @apiSuccessExample {json} Success-Response:
           * {
           *    "status": 200,
           *    "statusText": "SUCCESS",
           *    "message": "Process end successfully",
           *    "data": {
           *        "movedItem": {
           *            "location": {
           *                "_id": "63a4275118fb30af5f7d8403",
           *                "locationName": "Noida",
           *                "locationType": "Home",
           *                "locationAddress": "H-221 noida sec 63 Uttarpradesh",
           *                "locationPhoneNumber": "9623567489",
           *                "locationEmail": "jon@gmail.com",
           *                "custom1": "building 21",
           *                "custom2": "1st floor"
           *            },
           *            "item": {
           *                "borrower": {
           *                    "_id": "639abbc9f731ec47dc21dd33",
           *                    "name": "Ashish Verma",
           *                    "images": [
           *                        "traytracker/item-cart/1672118066172-pexels-math-90946.jpg",
           *                        "traytracker/item-cart/1672118069967-tree-736885__480.jpg"
           *                    ]
           *                },
           *                "_id": "639c37aa9f58487830d8f722",
           *                "itemName": "Catheter",
           *                "itemOwner": "1",
           *                "ownerName": "sahil",
           *                "loanerName": "rohit",
           *                "consignmentName": "rohan",
           *                "itemId": "GT0618082",
           *                "baseLocation": "noida  heritage hospital",
           *                "brand": "heath care",
           *                "type": "gggg",
           *                "custom1": "dfght",
           *                "custom2": "ghht",
           *                "images": [
           *                    "item/1671182248076-download (1).jpeg"
           *                ],
           *                "receivedImages": [
           *                    "traytracker/moved-item/1672118148828-pexels-math-90946.jpg",
           *                    "traytracker/moved-item/1672118151888-tree-736885__480.jpg"
           *                ]
           *            },
           *            "_id": "63aa7f5b607d8da41b82ef7c",
           *            "userId": "639abbc9f731ec47dc21dd33",
           *            "itemId": "639c37aa9f58487830d8f722",
           *            "surgeryDate": "2022-12-28T09:56:19.000Z",
           *            "surgonName": "pukhraj saini",
           *            "movingStatus": 2,
           *            "__v": 1
           *        },
           *        "execTime": 4965
           *    }
           * }
           *
           * */
    endMoveProcess(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const itemId = req.params.id;
                const files = req.files.receivedImages;
                const result = yield item_cart_service_1.default.endProcess(itemId, files);
                if (result.invalidItemId)
                    return ResponseHelper_1.default.badRequest(res, res.__('invalid_item_id'));
                return ResponseHelper_1.default.ok(res, res.__('item_process_end_successfully'), { movedItem: result.movedItem });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * @api {get} /api/v1/app/item/details/:itemId  Item details Moving item
     * @apiHeader {String} App-Version Version Code 1.0.0.
     * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
     * @apiVersion 1.0.0
     * @apiName details
     * @apiGroup App-Item
     * @apiParam {String} itemId item's _id
     * @apiDescription pass item's _id as params
     * @apiSuccessExample {json} Success-Response:
     * {
     *       "status": 200,
     *       "statusText": "SUCCESS",
     *       "message": "Item detail fetched successfully",
     *       "data": {
     *           "item": {
     *               "location": {
     *                   "_id": "63a4275118fb30af5f7d8403",
     *                   "locationName": "Noida",
     *                   "locationType": "Home",
     *                   "locationAddress": "H-221 noida sec 63 Uttarpradesh",
     *                   "locationPhoneNumber": "9623567489",
     *                   "locationEmail": "jon@gmail.com",
     *                   "custom1": "building 21",
     *                   "custom2": "1st floor"
     *               },
     *               "item": {
     *                   "borrower": {
     *                       "_id": "639abbc9f731ec47dc21dd33",
     *                       "name": "Ashish Verma"
     *                   },
     *                   "_id": "639c37aa9f58487830d8f722",
     *                   "itemName": "Catheter",
     *                   "itemOwner": "1",
     *                   "ownerName": "sahil",
     *                   "loanerName": "rohit",
     *                   "consignmentName": "rohan",
     *                   "itemId": "GT0618082",
     *                   "baseLocation": "noida  heritage hospital",
     *                   "brand": "heath care",
     *                   "type": "gggg",
     *                   "custom1": "dfght",
     *                   "custom2": "ghht",
     *                   "images": [
     *                       "item/1671182248076-download (1).jpeg"
     *                   ],
     *                   "receivedImages": []
     *               },
     *               "_id": "63a98d65a449ed2df75a191e",
     *               "userId": "639abbc9f731ec47dc21dd33",
     *               "itemId": "639c37aa9f58487830d8f722",
     *               "surgeryDate": "2022-12-01T11:56:43.015Z",
     *               "surgonName": "Test.                ",
     *               "movingStatus": 1,
     *               "__v": 0
     *           },
     *           "execTime": 212
     *       }
     *   }
     *
     * */
    getMovingItemDetails(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const itemId = req.params.id;
                const item = yield moved_item_model_1.default.findOne({ itemId, movingStatus: moved_item_interface_1.MovedItemStatus.moving });
                return ResponseHelper_1.default.ok(res, res.__('item_details'), { item });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new ItemController();
