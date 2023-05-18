import {IBaseRepository} from "../../../Shared/src/IBaseRepository";
import {DatabaseError} from "../../Error/Database.error";

export interface IAihRepository extends IBaseRepository {
	findCi: (title: string) => Promise<any[] | DatabaseError>
	findWg: (title: string) => Promise<any[] | DatabaseError>
}
