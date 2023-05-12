import {IBaseRepository} from "../Shared/src/IBaseRepository";
import {Role} from "./User/Entity/Role";
import {ReferenceOperation} from "./Tnk/Entity/ReferenceOperation";
import {Subprocess} from "./Tnk/Entity/Subprocess";
import {Process} from "./Tnk/Entity/Process";
import {DatabaseError} from "../API/v1/error/Database.error";

export interface IDictionaryRepository extends IBaseRepository {
    getActiveRoles(): Promise<Role[]>
    getAllDictItems(): Promise<any[]>
    getEditableDictTypes(): Promise<any[]>
    addOperations(operations: ReferenceOperation[]): Promise<void | DatabaseError>
    addProcesses(processes: Process[]): Promise<void | DatabaseError>
    addSubprocesses(subprocesses: Subprocess[]): Promise<void | DatabaseError>
}