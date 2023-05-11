import { Module } from '@nestjs/common';
import { USER_REPOSITORY } from './repository.constants';
import {UserRepository} from "./user.repository";
import {ILogger} from "../../../../../Core/ICore";
import {POSTGRES_STORAGE} from "../../constants";
import {PostgresModule} from "../postgres/postgres.module";
import {IDatabaseConnection} from "../IDatabaseConnection";
import {LoggerModule} from "../../logger/logger.module";

@Module({
	imports: [PostgresModule, LoggerModule],
	providers: [
		{
			provide: USER_REPOSITORY,
			useFactory: (logger: ILogger, storage: IDatabaseConnection) => {
				return new UserRepository(logger, storage)
			},
			inject: ['CustomLogger', POSTGRES_STORAGE],
		},
	],
	exports: [USER_REPOSITORY],
})
export class RepositoryModule {}
