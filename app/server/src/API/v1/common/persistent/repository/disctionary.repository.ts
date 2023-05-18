import {ILogger} from "../../../../../Core/ICore";
import {IDatabaseConnection} from "../IDatabaseConnection";
import {IDictionaryRepository} from "../../../../../Core/IDictionaryRepository";
import {ReferenceOperation} from "../../../../../Core/Tnk/Entity/ReferenceOperation";
import {Process} from "../../../../../Core/Tnk/Entity/Process";
import {Subprocess} from "../../../../../Core/Tnk/Entity/Subprocess";
import {DatabaseError} from "../../../../../Core/Error/Database.error";
import {IEventBus} from "../../../../../Core/IEventBus";
import { ItsmProcess } from '../../../../../Core/Tnk/Entity/ItsmProcess';

export class DictionaryRepository implements IDictionaryRepository {
    constructor(private readonly logger: ILogger, private readonly eventBus: IEventBus, private readonly storage: IDatabaseConnection) {}

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
                method: 'getSubprocessList'
            });
            return result;
        }

        return result;
    }

    async getOperationList(): Promise<ReferenceOperation[] | DatabaseError> {
        const sql = `
            SELECT * FROM dictionary."referenceOperation"
        `;
        return this.storage.query<ReferenceOperation>(sql);
    }

    async getItsmProcess(): Promise<ItsmProcess[] | DatabaseError> {
        const sql = `SELECT id, title FROM dictionary."itsmProcess"`;
        return this.storage.query<ItsmProcess>(sql);
    }

    async createSubprocess(dto: Subprocess, userId: string): Promise<number | DatabaseError> {
        const sql = `
            INSERT INTO dictionary.subprocess ("processId", title, code, "isActive", "esppObject", "dateCreated", "lastUpdated", "lastUpdatedBy", "itsmProcessId") 
            VALUES ($1, $2, $3, $4, $5, now(), null, $6, $7)
            RETURNING id
        `;

        const params = [
            dto.processId,
            dto.title,
            dto.code,
            dto.isActive,
            dto.esppObject,
            userId,
            dto.itsmProcess.id
        ];

        const result = await this.storage.queryOne<Subprocess>(sql, params);

        if (result instanceof DatabaseError) {
            this.logger.error(result.message, 'DictionaryRepository', null, {
                method: 'createSubprocess'
            });
            return result;
        }

        return result.id;
    }

    async updateSubprocess(dto: Subprocess, userId: string, subprocessId: number): Promise<number | DatabaseError> {
        const sql = `
            UPDATE dictionary.subprocess
            SET "processId" = $1, title = $2, code = $3, "isActive" = $4, "esppObject" = $5, "lastUpdatedBy" = $6, "itsmProcessId" = $7
            WHERE id = $8
            RETURNING id
        `;

        const params = [
            dto.processId,
            dto.title,
            dto.code,
            dto.isActive,
            dto.esppObject,
            userId,
            dto.itsmProcess.id,
            subprocessId
        ];

        const result = await this.storage.queryOne<Subprocess>(sql, params);

        if (result instanceof DatabaseError) {
            this.logger.error(result.message, 'DictionaryRepository', null, {
                method: 'updateSubprocess'
            });
            return result;
        }

        return result.id;
    }

}