import {IBaseRepository} from "../../Shared/src/IBaseRepository";
import {Tnk} from "./Tnk";
import {TnkBody} from "./ValueObject/TnkBody";
import {DatabaseError} from "../../API/v1/error/Database.error";

export interface ITnkRepository extends IBaseRepository {
    find: (searchParams: any) => Promise<Tnk[] | DatabaseError>
    findOne: (tnkId: number) => Promise<Tnk | DatabaseError>
    create: (dto: TnkBody) => Promise<Tnk | DatabaseError>
    update: (tnk: Tnk) => Promise<Tnk | DatabaseError>
}
