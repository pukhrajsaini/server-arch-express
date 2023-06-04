declare class UserItemService {
    list(borrowerId: any, queryString: any): Promise<{
        count: number;
        list: any[];
    }>;
    private movingItemList;
}
declare const _default: UserItemService;
export default _default;
