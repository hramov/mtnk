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

    async getProcessList(): Promise<Process[] | DatabaseError> {
        const sql = `
            SELECT * FROM dictionary.process
        `;
        return this.storage.query<Process>(sql);
    }

    async getSubprocessList(): Promise<Subprocess[] | DatabaseError> {
        const sql = `
            SELECT s.id, s.title, s.code, s."isActive", s."processId", json_build_object('id', i.id, 'title', i.title) as "itsmProcess" FROM dictionary.subprocess s
            JOIN dictionary."itsmProcess" i on s."itsmProcessId" = i.id
        `;
        const result = await this.storage.query<Subprocess>(sql);

        if (result instanceof DatabaseError) {
            this.logger.error(result.message, 'DictionaryRepository', null, {
                method: 'writeListener'
            });
            return result;
        }

        return result;
    }

    getOperationList(): Promise<ReferenceOperation[] | DatabaseError> {
        const sql = `
            SELECT * FROM dictionary."referenceOperation"
        `;
        return this.storage.query<ReferenceOperation>(sql);
    }

}