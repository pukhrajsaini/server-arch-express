import { UserInterface } from "../../interfaces/UserInterface";
declare class UserService {
    list(queryString: any): Promise<{
        count: number;
        list: UserInterface[];
    }>;
}
declare const _default: UserService;
export default _default;
