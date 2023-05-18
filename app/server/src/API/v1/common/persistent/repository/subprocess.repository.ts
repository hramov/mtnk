import {ILogger} from "../../../../../Core/ICore";
import {IDatabaseConnection} from "../IDatabaseConnection";
import {ISubprocessRepository} from "../../../../../Core/Tnk/Repository/ISubprocessRepository";
import {Subprocess} from "../../../../../Core/Tnk/Entity/Subprocess";
import {DatabaseError} from "../../../../../Core/Error/Database.error";
import {IEventBus} from "../../../../../Core/IEventBus";

export class SubprocessRepository implements ISubprocessRepository {
    constructor(private readonly logger: ILogger, private readonly eventBus: IEventBus, private readonly storage: IDatabaseConnection) {}

    create(dto: Subprocess): Promise<Subprocess | DatabaseError> {
        return Promise.resolve(undefined);
    }

    find(): Promise<Subprocess[] | DatabaseError> {
        return Promise.resolve(undefined);
    }

    async findOne(subprocessId: number): Promise<Subprocess | DatabaseError> {
        const sql = `
            SELECT s.id, s.title, s.code, s."isActive", s."esppObject", s."processId", json_agg(aps.*) as "approvalSetup"
            FROM dictionary.subprocess s
            JOIN dictionary.approval_setup aps on aps."subprocessId" = s.id 
            WHERE s.id = $1
            GROUP BY s.id, s.title, s.code, s."isActive", s."esppObject", s."processId"
        `;
        const params = [subprocessId];

        return this.storage.queryOne<Subprocess>(sql, params);
    }

    update(process: Subprocess): Promise<Subprocess | DatabaseError> {
        return Promise.resolve(undefined);
    }
}