import { UserInterface } from "../../interfaces/user.interface";
declare class IndividualUserService {
    /**
   * @description listing of user
   * @param queryString req query object
   * @params User id of user
   * @returns
   */
    add(name: string, email: string, countryCode: string, phoneNumber: string): Promise<UserInterface>;
    /**
    *
    * @param _id id of individual user
    * @param name name  of individual user
    * @param email email of individual user
    * @param countryCode countryCode of individual user
    * @returns  {Promise<IndividualUserInterface>}
    */
    update(_id: string, name: string, email: string, countryCode: string, phoneNumber: string): Promise<UserInterface>;
    list(queryString: any): Promise<{
        count: number;
        list: UserInterface[];
    }>;
}
declare const _default: IndividualUserService;
export default _default;
