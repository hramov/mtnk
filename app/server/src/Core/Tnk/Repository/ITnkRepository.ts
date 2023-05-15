import {IBaseRepository} from "../../../Shared/src/IBaseRepository";
import {Tnk} from "../Tnk";
import {DatabaseError} from "../../../API/v1/error/Database.error";
import {SearchTnkSpecification} from "../Specification/SearchTnkSpecification";

export interface ITnkRepository extends IBaseRepository {
    find: (specification: SearchTnkSpecification) => Promise<Tnk[] | DatabaseError>
    findOne: (tnkId: number) => Promise<Tnk | DatabaseError>
    create: (dto: Tnk) => Promise<Tnk | DatabaseError>
    update: (tnk: Tnk) => Promise<Tnk | DatabaseError>
}
