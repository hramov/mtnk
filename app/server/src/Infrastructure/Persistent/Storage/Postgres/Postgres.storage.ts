import * as pgPromise from 'pg-promise';
import {IClient} from 'pg-promise/typescript/pg-subset';
import {DatabaseError} from "../../../../API/v1/error/Database.error";
import QueryResultError = pgPromise.errors.QueryResultError;

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
			const data = await this.conn.many<T>(sql, values);
			return data;
		} catch (_err: unknown) {
			const err = _err as QueryResultError;
			return new DatabaseError(err.message + ' ' + PostgresStorage.cleanErrorMessage(err.query));
		}
	}

	public async queryOne<T>(
		sql: string,
		values?: any[],
		options?: IPostgresQueryOptions,
	): Promise<T | DatabaseError> {
		try {
			const data = await this.conn.one<T>(sql, values);
			return data;
		} catch (_err: unknown) {
			const err = _err as QueryResultError;
			return new DatabaseError(err.message + ' ' + PostgresStorage.cleanErrorMessage(err.query));
		}
	}

	private static cleanErrorMessage(message: string) {
		return message.replace(/ +(?= )/g,'').replace(/(\r\n|\n|\r)/gm, "").trim();
	}
}
