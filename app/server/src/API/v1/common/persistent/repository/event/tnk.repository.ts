import {ILogger} from "../../../../../../Core/ICore";
import {IDatabaseConnection} from "../../IDatabaseConnection";
import {CreateNewTnkEvent} from "../../../../../../Core/Tnk/Events/TnkCreated";
import {DatabaseError} from "../../../../error/Database.error";
import {IEventBus} from "../../../../../../Core/IEventBus";

type TnkEvents = CreateNewTnkEvent

export class TnkEventRepository {
    constructor(private readonly logger: ILogger, private readonly eventBus: IEventBus, private readonly storage: IDatabaseConnection) {
        this.writeListener();
    }

    writeListener() {
        this.eventBus.on('tnk-event', async (event: TnkEvents) => {
            const sql = `
                INSERT INTO aggregate.tnk (aggregate_id, date_created, user_id, user_ip, revision, data, type) 
                VALUES ($1, $2, $3, $4, revision + 1, $6, $7) RETURNING id`;
            const params = [event.aggregateId, event.dateCreated, event.userId, event.userIp, event.data, event.type];

            const result = await this.storage.queryOne<{ id: number }>(sql, params);
            if (result instanceof DatabaseError) {
                // TODO error handling
            }
        });
    }

    async getByAggregateId(aggregateId: string) {
        const sql = `
            SELECT aggregate_id, date_created, user_id, user_ip, revision, data, type 
            FROM aggregate.tnk 
            WHERE aggregate_id = $1
        `;
        const params = [aggregateId];
    }
}