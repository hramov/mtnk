import { ILogger } from '../../../../../../Core/ICore';
import { IDatabaseConnection } from '../../IDatabaseConnection';
import { DatabaseError } from '../../../../../../Core/Error/Database.error';
import { BaseEvent } from '../../../../../../Core/BaseEvent';
import { IPostgresQueryOptions } from '../../IPostgresQueryOptions';
import { IUserEventRepository, UserEvent } from '../../../../../../Core/User/Repository/event/IUserEventRepository';
import { UserConstructor } from '../../../../../../Core/User/User';
import { UserSearchParams } from '../../../../../../Core/User/ValueObject/UserSearchParams';
import { merge } from 'lodash';

export class UserEventRepository implements IUserEventRepository {
	constructor(private readonly logger: ILogger, private readonly storage: IDatabaseConnection<IPostgresQueryOptions>) {}

	async writeEvent(event: UserEvent) {
		const lastRevision = await this.storage.queryOne<{ max: number }>(`
                select max(revision) 
                from aggregate.user 
                where "aggregateId" = $1 and type = $2
            `, [event.aggregateId, event.type]);

		if (lastRevision instanceof DatabaseError) {
			this.logger.error(lastRevision.message, 'TnkEventRepository', lastRevision.stack, {
				method: 'writeEvent'
			});
			return;
		}

		const nextRevision = lastRevision.max ? lastRevision.max + 1 : 1;

		const sql = `
                INSERT INTO aggregate.tnk ("aggregateId", "dateCreated", "userId", "userIp", "revision", "data", "type")
                VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;

		const params = [event.aggregateId, event.dateCreated, event.userId, event.userIp.value, nextRevision, event.data, event.type];

		const result = await this.storage.queryOne<{ id: number }>(sql, params);
		if (result instanceof DatabaseError) {
			this.logger.error(result.message, 'TnkEventRepository', result.stack, {
				method: 'writeEvent'
			})
		}
		return result;
	}

	async writeEvents(events: UserEvent[]) {
		const sql: string[] = [];
		const params: any[][] = [];

		for (const event of events) {
			const lastRevision = await this.storage.queryOne<{ max: number }>(`
                select max(revision) 
                from aggregate.tnk 
                where "aggregateId" = $1 and type = $2
            `, [event.aggregateId, event.type]);

			if (lastRevision instanceof DatabaseError) {
				this.logger.error(lastRevision.message, 'TnkEventRepository', lastRevision.stack, {
					method: 'writeEvent'
				});
				return new DatabaseError();
			}

			const nextRevision = lastRevision.max ? lastRevision.max + 1 : 1;

			sql.push(`
                INSERT INTO aggregate.tnk ("aggregateId", "dateCreated", "userId", "userIp", "revision", "data", "type")
                VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id
            `);

			params.push([event.aggregateId, event.dateCreated, event.userId, event.userIp.value, nextRevision, event.data, event.type]);
		}

		return await this.storage.queryTx<{ id: number }>(sql, params);
	}

	async get(searchParams: UserSearchParams): Promise<UserConstructor[] | DatabaseError> {
		const sql = `
            SELECT *  
            FROM report.tnk
            ORDER BY "dateCreated" DESC
            LIMIT $1 OFFSET $2
        `;
		const params = [searchParams.limit, searchParams.offset];

		const result = await this.storage.query<UserConstructor>(sql, params);
		if (result instanceof DatabaseError) {
			this.logger.error(result.message, 'TnkEventRepository', null, {
				method: 'writeListener'
			});
		}
		return result;
	}

	async getByAggregateId(aggregateId: string): Promise<UserConstructor | DatabaseError> {
		const sql = `
            SELECT "aggregateId", "dateCreated", "userId", "userIp", "revision", "data", "type" 
            FROM aggregate.user 
            WHERE "aggregateId" = $1
            ORDER BY "dateCreated"
        `;
		const params = [aggregateId];

		const result = await this.storage.query<BaseEvent<UserConstructor>>(sql, params);
		if (result instanceof DatabaseError) {
			this.logger.error(result.message, 'TnkEventRepository', null, {
				method: 'writeListener'
			});
			return result;
		}

		return this.assemblyUser(result);
	}

	private createHistoryItem(title: string, history: any[], event: UserEvent) {
		history.push({
			title,
			dt: event.dateCreated,
			userId: event.userId,
			userIp: event.userIp,
		})
	}

	private createTimelineItem(title: string, timeline: any[], event: UserEvent) {
		timeline.push({
			title,
			dt: event.dateCreated,
		})
	}

	private assemblyUser(events: UserEvent[]): UserConstructor {
		let user: UserConstructor = null;

		for (const event of events) {
			if (event.type === 'UserCreated') {
				user = merge({}, event.data)
			}
		}
		return user;
	}
}