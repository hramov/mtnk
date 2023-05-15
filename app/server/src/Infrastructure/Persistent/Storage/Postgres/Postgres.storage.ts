import * as pgPromise from 'pg-promise';
import {IClient} from 'pg-promise/typescript/pg-subset';
import {DatabaseError} from "../../../../API/v1/error/Database.error";

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
	): Promise<T[] | DatabaseError> {
		try {
			return await this.conn.many<T>(sql, values);
		} catch (err) {
			return err;
		}
	}

	public async queryOne<T>(
		sql: string,
		values?: any[],
		options?: IPostgresQueryOptions,
	): Promise<T | DatabaseError> {
		try {
			return await this.conn.one<T>(sql, values);
		} catch (err) {
			return err;
		}
	}
}
