import { ItemInterface } from "../../interfaces/item.interface";
declare class ItemService {
    add(ItemData: ItemInterface): Promise<{
        item?: ItemInterface;
    }>;
    /**
     * @param photo {File} photo to be uploaded
     * @param directory {String} photo directory
     * @returns {Promise<{url: string}>} uploaded photo base path
     */
    private uploadPhoto;
    private uploadPhotos;
    private uploadPdf;
    private generateItemId;
    update(ItemId: string, itemData: ItemInterface, images: any, pdf: any): Promise<ItemInterface>;
    list(queryString: any): Promise<{
        count: number;
        list: ItemInterface[];
    }>;
}
declare const _default: ItemService;
export default _default;
