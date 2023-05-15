import {ILogger} from "../../../../../Core/ICore";
import {IDatabaseConnection} from "../IDatabaseConnection";
import {IDictionaryRepository} from "../../../../../Core/IDictionaryRepository";
import {ReferenceOperation} from "../../../../../Core/Tnk/Entity/ReferenceOperation";
import {Role} from "../../../../../Core/User/Entity/Role";
import {Process} from "../../../../../Core/Tnk/Entity/Process";
import {Subprocess} from "../../../../../Core/Tnk/Entity/Subprocess";
import {DatabaseError} from "../../../error/Database.error";
import {IEventBus} from "../../../../../Core/IEventBus";

export class DictionaryRepository implements IDictionaryRepository {
    constructor(private readonly logger: ILogger, private readonly eventBus: IEventBus, private readonly storage: IDatabaseConnection) {}

    getActiveRoles(): Promise<Role[]> {
        return Promise.resolve([]);
    }

    getAllDictItems(): Promise<any[]> {
        return Promise.resolve([]);
    }

    getEditableDictTypes(): Promise<any[]> {
        return Promise.resolve([]);
    }

    addProcesses(processes: Process[]): Promise<void | DatabaseError> {
        return Promise.resolve(undefined);
    }

    addSubprocesses(subprocesses: Subprocess[]): Promise<void | DatabaseError> {
        return Promise.resolve(undefined);
    }

    getProcess(processId: number): Promise<Process | DatabaseError> {
        return Promise.resolve(undefined);
    }

    getSubprocess(subprocessId: number): Promise<Subprocess | DatabaseError> {
        return Promise.resolve(undefined);
    }

    addOperations(operations: ReferenceOperation[]): Promise<void | DatabaseError> {
        return Promise.resolve(undefined);
    }


}