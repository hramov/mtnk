import { Module } from '@nestjs/common';
import {
	AIH_REPOSITORY,
	DICTIONARY_REPOSITORY,
	PROCESS_REPOSITORY,
	SUBPROCESS_REPOSITORY, TNK_EVENT_REPOSITORY,
	TNK_REPOSITORY,
	USER_REPOSITORY,
} from './repository.constants';
import {UserRepository} from "./user.repository";
import {ILogger} from "../../../../../Core/ICore";
import { EVENT_BUS, LOGGER, MSSQL_STORAGE, POSTGRES_STORAGE } from '../../constants';
import {PostgresModule} from "../postgres/postgres.module";
import {IDatabaseConnection} from "../IDatabaseConnection";
import {LoggerModule} from "../../logger/logger.module";
import {DictionaryRepository} from "./disctionary.repository";
import {ProcessRepository} from "./process.repository";
import {SubprocessRepository} from "./subprocess.repository";
import {EventBusModule} from "../../eventBus/eventBus.module";
import {IEventBus} from "../../../../../Core/IEventBus";
import {TnkEventRepository} from "./event/tnk.repository";
import { TnkRepository } from './tnk.repository';
import { AihRepository } from './aih.repository';
import { IPostgresQueryOptions } from '../IPostgresQueryOptions';
import { IMssqlQueryOptions } from '../IMssqlQueryOptions';
import { MssqlModule } from '../mssql/mssql.module';

@Module({
	imports: [PostgresModule, MssqlModule, LoggerModule, EventBusModule],
	providers: [
		{
			provide: USER_REPOSITORY,
			useFactory: (logger: ILogger, eventBus: IEventBus, storage: IDatabaseConnection<IPostgresQueryOptions>) => {
				return new UserRepository(logger, eventBus, storage)
			},
			inject: [LOGGER, EVENT_BUS, POSTGRES_STORAGE],
		},
		{
			provide: TNK_REPOSITORY,
			useFactory: (logger: ILogger, storage: IDatabaseConnection<IPostgresQueryOptions>) => {
				return new TnkRepository(logger, storage)
			},
			inject: [LOGGER, POSTGRES_STORAGE],
		},
		{
			provide: TNK_EVENT_REPOSITORY,
			useFactory: (logger: ILogger, eventBus: IEventBus, storage: IDatabaseConnection<IPostgresQueryOptions>) => {
				return new TnkEventRepository(logger, eventBus, storage)
			},
			inject: [LOGGER, EVENT_BUS, POSTGRES_STORAGE],
		},
		{
			provide: DICTIONARY_REPOSITORY,
			useFactory: (logger: ILogger, eventBus: IEventBus, storage: IDatabaseConnection<IPostgresQueryOptions>) => {
				return new DictionaryRepository(logger, eventBus, storage)
			},
			inject: [LOGGER, EVENT_BUS, POSTGRES_STORAGE],
		},
		{
			provide: PROCESS_REPOSITORY,
			useFactory: (logger: ILogger, eventBus: IEventBus, storage: IDatabaseConnection<IPostgresQueryOptions>) => {
				return new ProcessRepository(logger, eventBus, storage)
			},
			inject: [LOGGER, EVENT_BUS, POSTGRES_STORAGE],
		},
		{
			provide: SUBPROCESS_REPOSITORY,
			useFactory: (logger: ILogger, eventBus: IEventBus, storage: IDatabaseConnection<IPostgresQueryOptions>) => {
				return new SubprocessRepository(logger, eventBus, storage)
			},
			inject: [LOGGER, EVENT_BUS, POSTGRES_STORAGE],
		},
		{
			provide: AIH_REPOSITORY,
			useFactory: (logger: ILogger, storage: IDatabaseConnection<IMssqlQueryOptions>) => {
				return new AihRepository(logger, storage)
			},
			inject: [LOGGER, MSSQL_STORAGE],
		},
	],
	exports: [USER_REPOSITORY, TNK_REPOSITORY, TNK_EVENT_REPOSITORY, DICTIONARY_REPOSITORY, PROCESS_REPOSITORY, SUBPROCESS_REPOSITORY, AIH_REPOSITORY],
})
export class RepositoryModule {}
