import { Module } from '@nestjs/common';
import {
	IMssqlConnOptions,
	MssqlStorage,
} from '../../../../../Infrastructure/Persistent/Storage/Mssql/Mssql.storage';
import {MSSQL_STORAGE} from "../../constants";

@Module({
	providers: [
		{
			provide: MSSQL_STORAGE,
			useFactory: () => {
				const options: IMssqlConnOptions = {
					server: process.env.MSSQL_HOST,
					user: process.env.MSSQL_USERNAME,
					password: process.env.MSSQL_PASSWORD,
					database: process.env.MSSQL_DATABASE,
					pool: {
						min: 1,
						max: 10,
						idleTimeoutMillis: 10000,
					},
					options: {
						encrypt: false,
						trustServerCertificate: true,
					}

				};
				return new MssqlStorage(options);
			},
		},
	],
	exports: [MSSQL_STORAGE],
})
export class MssqlModule {}
