import {IBaseRepository} from "../../../Shared/src/IBaseRepository";
import {DatabaseError} from "../../Error/Database.error";
import {Process} from "../Entity/Process";

export interface ProcessSearchParams {
    title: string;
}

export interface IProcessRepository extends IBaseRepository {
    find: (params: ProcessSearchParams) => Promise<Process[] | DatabaseError>
    findOne: (processId: number) => Promise<Process | DatabaseError>
    create: (dto: Process) => Promise<Process | DatabaseError>
    update: (process: Process) => Promise<Process | DatabaseError>
}
