import { Module } from '@nestjs/common';
import {
	DICTIONARY_REPOSITORY,
	PROCESS_REPOSITORY,
	SUBPROCESS_REPOSITORY,
	TNK_REPOSITORY,
	USER_REPOSITORY
} from './repository.constants';
import {UserRepository} from "./user.repository";
import {ILogger} from "../../../../../Core/ICore";
import {POSTGRES_STORAGE} from "../../constants";
import {PostgresModule} from "../postgres/postgres.module";
import {IDatabaseConnection} from "../IDatabaseConnection";
import {LoggerModule} from "../../logger/logger.module";
import {DictionaryRepository} from "./disctionary.repository";
import {ProcessRepository} from "./process.repository";
import {SubprocessRepository} from "./subprocess.repository";

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
		{
			provide: TNK_REPOSITORY,
			useFactory: (logger: ILogger, storage: IDatabaseConnection) => {
				return new UserRepository(logger, storage)
			},
			inject: ['CustomLogger', POSTGRES_STORAGE],
		},
		{
			provide: DICTIONARY_REPOSITORY,
			useFactory: (logger: ILogger, storage: IDatabaseConnection) => {
				return new DictionaryRepository(logger, storage)
			},
			inject: ['CustomLogger', POSTGRES_STORAGE],
		},
		{
			provide: PROCESS_REPOSITORY,
			useFactory: (logger: ILogger, storage: IDatabaseConnection) => {
				return new ProcessRepository(logger, storage)
			},
			inject: ['CustomLogger', POSTGRES_STORAGE],
		},
		{
			provide: SUBPROCESS_REPOSITORY,
			useFactory: (logger: ILogger, storage: IDatabaseConnection) => {
				return new SubprocessRepository(logger, storage)
			},
			inject: ['CustomLogger', POSTGRES_STORAGE],
		},
	],
	exports: [USER_REPOSITORY, TNK_REPOSITORY, DICTIONARY_REPOSITORY, PROCESS_REPOSITORY, SUBPROCESS_REPOSITORY],
})
export class RepositoryModule {}
