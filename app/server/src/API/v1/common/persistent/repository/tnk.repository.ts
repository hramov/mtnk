import { ILogger } from '../../../../../Core/ICore';
import { IDatabaseConnection } from '../IDatabaseConnection';
import { ITnkRepository } from '../../../../../Core/Tnk/Repository/ITnkRepository';
import { Tnk, TnkConstructor } from '../../../../../Core/Tnk/Tnk';
import { DatabaseError } from '../../../../../Core/Error/Database.error';
import { TnkSearchParams } from '../../../../../Core/Tnk/ValueObject/TnkSearchParams';
import { Ip } from '../../../../../Shared/src/ValueObject/Objects/Ip';
import { IPostgresQueryOptions } from '../IPostgresQueryOptions';

export class TnkRepository implements ITnkRepository {
	constructor(private readonly logger: ILogger, private readonly storage: IDatabaseConnection<IPostgresQueryOptions>) {
	}

	find(searchParams: TnkSearchParams): Promise<Tnk[] | DatabaseError> {
		const sql = `
			SELECT t.id, t.title, t."tnkId", 
			    json_build_object('id', p.id, 'title', p.title) process,
                json_build_object('id', s.id, 'title', s.title) subprocess,
                json_build_object('id', st.code, 'title', st.title) status
			FROM report.tnk t
			JOIN dictionary.process p on t."processId" = p.id
			JOIN dictionary.subprocess s on t."subprocessId" = s.id
			JOIN dictionary.status st on t."statusId" = st.code
			LIMIT $1 OFFSET $2
		`;
		const params = [
			searchParams.limit,
			searchParams.offset
		];

		return this.storage.query<Tnk>(sql, params);
	}

	async create(dto: any, userId: string, userIp: Ip): Promise<{ id: number } | DatabaseError> {
		const sql = `
            INSERT INTO report.tnk (title, "dateCreated", "processId", "subprocessId", "statusId", "tnkId", "creatorId", "creatorIp")
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
			RETURNING id;
        `;
		const params = [
			dto.title,
			dto.dateCreated,
			dto.process.id,
			dto.subprocess.id,
			dto.status.code,
			dto.tnkId,
			userId,
			userIp.toString()
		];

		return this.storage.queryOne<{ id: number }>(sql, params);
	}

	async update(dto: TnkConstructor): Promise<{ id: number } | DatabaseError> {
		const sql = `
            UPDATE report.tnk
            SET title = $1, "processId" = $2, "subprocessId" = $3, "statusId" = $4
			WHERE "tnkId" = $6
        `;
		const params = [
			dto.title,
			dto.process.id,
			dto.subprocess.id,
			dto.status.code,
			dto.tnkId
		];

		return this.storage.queryOne<{ id: number }>(sql, params);
	}
}