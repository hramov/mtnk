import * as pgPromise from 'pg-promise';
import { IClient } from 'pg-promise/typescript/pg-subset';

export interface IPostgresConnOptions {
	host: string;
	port: number;
	database: string;
	user: string;
	password: string;
}

export interface IPostgresQueryOptions {}

export class PostgresStorage {
	private readonly conn: pgPromise.IDatabase<IClient>;

	constructor(connOptions: IPostgresConnOptions) {
		this.conn = pgPromise()(connOptions);
	}

	public async query<T>(
		sql: string,
		values?: any[],
		options?: IPostgresQueryOptions,
	): Promise<T[] | Error> {
		try {
			const data = await this.conn.many<T>(sql, values);
			return data;
		} catch (err) {
			return err;
		}
	}

	public async queryOne<T>(
		sql: string,
		values?: any[],
		options?: IPostgresQueryOptions,
	): Promise<T | Error> {
		try {
			const data = await this.conn.one<T>(sql, values);
			return data;
		} catch (err) {
			return err;
		}
	}
}
