import { connect, ConnectionPool, MSSQLError } from 'mssql';
import {DatabaseError} from "../../../../Core/Error/Database.error";
import { IDatabaseConnection } from '../../../../API/v1/common/persistent/IDatabaseConnection';
import { IMssqlQueryOptions } from '../../../../API/v1/common/persistent/IMssqlQueryOptions';

export interface IMssqlConnOptions {
	user: string;
	password: string;
	database: string;
	server: string;
	pool: {
		max: number,
		min: number,
		idleTimeoutMillis: number
	},
	options: {
		encrypt: boolean,
		trustServerCertificate: boolean,
	}
}

export class MssqlStorage implements IDatabaseConnection<IMssqlQueryOptions> {
	private conn: ConnectionPool

	constructor(connOptions: IMssqlConnOptions) {
		connect(connOptions)
			.then((conn) => this.conn = conn)
	}

	public async query<T>(
		sql: string,
		values?: any[],
		options?: IMssqlQueryOptions,
	): Promise<T[] | DatabaseError> {
		try {
			const data = await this.conn.query<T>(sql);
			return data.recordset;
		} catch (_err: unknown) {
			const err = _err as MSSQLError;
			return new DatabaseError(err.message);
		}
	}

	queryOne<T>(sql: string, values: any[] | undefined, options: IMssqlQueryOptions | undefined): Promise<DatabaseError | T> {
		return Promise.resolve(undefined);
	}

	queryTx<T>(sql: string[], values: any[][] | undefined, options: IMssqlQueryOptions | undefined): Promise<any> {
		return Promise.resolve(undefined);
	}

}
