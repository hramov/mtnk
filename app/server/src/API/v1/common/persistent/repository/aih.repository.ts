import { ILogger } from '../../../../../Core/ICore';
import { IDatabaseConnection } from '../IDatabaseConnection';
import { IAihRepository } from '../../../../../Core/Tnk/Repository/IAihRepository';
import { DatabaseError } from '../../../../../Core/Error/Database.error';
import { IMssqlQueryOptions } from '../IMssqlQueryOptions';

export class AihRepository implements IAihRepository {
	constructor(private readonly logger: ILogger, private readonly storage: IDatabaseConnection<IMssqlQueryOptions>) {
	}

	async findCi(title: string): Promise<any[] | DatabaseError> {
		const sql = ``;
		const params = [];
		return await this.storage.query(sql, params);
	}

	async findWg(title: string): Promise<any[] | DatabaseError> {
		const sql = ``;
		const params = [];
		return await this.storage.query(sql, params);
	}
}