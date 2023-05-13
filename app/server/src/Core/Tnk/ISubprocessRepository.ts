import {IBaseRepository} from "../../Shared/src/IBaseRepository";
import {DatabaseError} from "../../API/v1/error/Database.error";
import {Process} from "./Entity/Process";
import {Subprocess} from "./Entity/Subprocess";

export interface ISubprocessRepository extends IBaseRepository {
    find: () => Promise<Subprocess[] | DatabaseError>
    findOne: (subprocessId: number) => Promise<Subprocess | DatabaseError>
    create: (dto: Subprocess) => Promise<Subprocess | DatabaseError>
    update: (process: Subprocess) => Promise<Subprocess | DatabaseError>
}
