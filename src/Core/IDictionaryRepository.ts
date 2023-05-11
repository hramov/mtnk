import {IBaseRepository} from "../Shared/src/IBaseRepository";
import {Role} from "./User/Entity/Role";

export interface IDictionaryRepository extends IBaseRepository {
    getActiveRoles(): Promise<Role[]>
    getAllDictItems(): Promise<any[]>
    getEditableDictTypes(): Promise<any[]>
}