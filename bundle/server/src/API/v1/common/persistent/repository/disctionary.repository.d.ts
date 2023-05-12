import { ILogger } from "../../../../../Core/ICore";
import { IDatabaseConnection } from "../IDatabaseConnection";
import { IDictionaryRepository } from "../../../../../Core/IDictionaryRepository";
import { ReferenceOperation } from "../../../../../Core/Tnk/Entity/ReferenceOperation";
import { Role } from "../../../../../Core/User/Entity/Role";
import { Process } from "../../../../../Core/Tnk/Entity/Process";
import { Subprocess } from "../../../../../Core/Tnk/Entity/Subprocess";
import { DatabaseError } from "../../../error/Database.error";
export declare class DictionaryRepository implements IDictionaryRepository {
    private readonly logger;
    private readonly storage;
    constructor(logger: ILogger, storage: IDatabaseConnection);
    getActiveRoles(): Promise<Role[]>;
    getAllDictItems(): Promise<any[]>;
    getEditableDictTypes(): Promise<any[]>;
    addOperations(operations: ReferenceOperation[]): Promise<void | DatabaseError>;
    addProcesses(processes: Process[]): Promise<void | DatabaseError>;
    addSubprocesses(subprocesses: Subprocess[]): Promise<void | DatabaseError>;
    getProcess(processId: number): Promise<Process | DatabaseError>;
    getSubprocess(subprocessId: number): Promise<Subprocess | DatabaseError>;
}
