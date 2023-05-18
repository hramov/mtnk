import { ILogger } from '../../../../../Core/ICore';
import { IDatabaseConnection } from '../IDatabaseConnection';
import { ITnkRepository } from '../../../../../Core/Tnk/Repository/ITnkRepository';
import { Tnk, TnkConstructor } from '../../../../../Core/Tnk/Tnk';
import { DatabaseError } from '../../../../../Core/Error/Database.error';
import { TnkSearchParams } from '../../../../../Core/Tnk/ValueObject/TnkSearchParams';
import { Ip } from '../../../../../Shared/src/ValueObject/Objects/Ip';

export class TnkRepository implements ITnkRepository {
	constructor(private readonly logger: ILogger, private readonly storage: IDatabaseConnection) {
	}

	find(searchParams: TnkSearchParams): Promise<Tnk[] | DatabaseError> {
		return Promise.resolve(undefined);
	}

	findOne(tnkId: number): Promise<Tnk | DatabaseError> {
		return Promise.resolve(undefined);
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