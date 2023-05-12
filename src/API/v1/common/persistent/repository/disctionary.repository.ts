import {ILogger} from "../../../../../Core/ICore";
import {IDatabaseConnection} from "../IDatabaseConnection";
import {IDictionaryRepository} from "../../../../../Core/IDictionaryRepository";
import {ReferenceOperation} from "../../../../../Core/Tnk/Entity/ReferenceOperation";
import {Role} from "../../../../../Core/User/Entity/Role";
import {Process} from "../../../../../Core/Tnk/Entity/Process";
import {Subprocess} from "../../../../../Core/Tnk/Entity/Subprocess";
import {DatabaseError} from "../../../error/Database.error";

export class DictionaryRepository implements IDictionaryRepository {
    constructor(private readonly logger: ILogger, private readonly storage: IDatabaseConnection) {}

    getActiveRoles(): Promise<Role[]> {
        return Promise.resolve([]);
    }

    getAllDictItems(): Promise<any[]> {
        return Promise.resolve([]);
    }

    getEditableDictTypes(): Promise<any[]> {
        return Promise.resolve([]);
    }

    async addOperations(operations: ReferenceOperation[]): Promise<void | DatabaseError> {
        const sql = `insert into tnk.operations (title, duration, unit_id, source_id, block_id, doc_num) values ($1, $2, $3, $4, $5, $6, $7)`
        for (const operation of operations) {
            const params = [
                operation.title,
                operation.duration,
                operation.unitId,
                operation.sourceId,
                operation.blockId,
                operation.docNum,
            ]
            const result = await this.storage.query(sql, params);
            if (result instanceof DatabaseError) {
                return result;
            }
        }
        return Promise.resolve(undefined);
    }

    addProcesses(processes: Process[]): Promise<void | DatabaseError> {
        return Promise.resolve(undefined);
    }

    addSubprocesses(subprocesses: Subprocess[]): Promise<void | DatabaseError> {
        return Promise.resolve(undefined);
    }


}