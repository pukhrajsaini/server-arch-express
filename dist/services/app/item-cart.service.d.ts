import { ItemCartImageType } from "../../interfaces/item-cart.interface";
import { MovedItemInterface } from "../../interfaces/moved-item.interface";
import { UserInterface } from "../../interfaces/user.interface";
import DataDog from "../../utils/logger";
declare class ItemCartService {
    /**
    * @description get moving items details
    * @param user
    * @returns moving items
    */
    movingItemsDetails(user: UserInterface): Promise<any>;
    /**
     * @description upload item's image on items added in cart
     * @param items ItemCartImageType
     * @param user
     * @returns
     */
    uploadMovingCartImages(items: ItemCartImageType, user: UserInterface, logger: DataDog): Promise<{
        validationFailed?: boolean;
        success?: boolean;
        isValidObjectId?: boolean;
    }>;
    /**
     * @description update a photo on s3 and in a directory
     * @param photo photo should be uploaded
     * @param directory
     * @returns uploaded image s3 absolute path
     */
    private uploadPhoto;
    /**
     * @description upload multiple photos on s3
     * @param photos
     * @param productId
     * @returns uploaded photos urls array
     */
    uploadPhotos(photos: any, directory: string): Promise<string[]>;
    /**
     * @description end item's moving process and update receiver's images
     * @param itemId
     * @param images
     * @returns moved item
     */
    endProcess(itemId: string, images: any[]): Promise<{
        invalidItemId?: boolean;
        movedItem?: MovedItemInterface;
    }>;
}
declare const _default: ItemCartService;
export default _default;
