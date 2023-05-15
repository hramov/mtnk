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
import {EVENT_BUS, POSTGRES_STORAGE} from "../../constants";
import {PostgresModule} from "../postgres/postgres.module";
import {IDatabaseConnection} from "../IDatabaseConnection";
import {LoggerModule} from "../../logger/logger.module";
import {DictionaryRepository} from "./disctionary.repository";
import {ProcessRepository} from "./process.repository";
import {SubprocessRepository} from "./subprocess.repository";
import {EventBusModule} from "../../eventBus/eventBus.module";
import {IEventBus} from "../../../../../Core/IEventBus";
import {TnkEventRepository} from "./event/tnk.repository";

@Module({
	imports: [PostgresModule, LoggerModule, EventBusModule],
	providers: [
		{
			provide: USER_REPOSITORY,
			useFactory: (logger: ILogger, eventBus: IEventBus, storage: IDatabaseConnection) => {
				return new UserRepository(logger, eventBus, storage)
			},
			inject: ['CustomLogger', EVENT_BUS, POSTGRES_STORAGE],
		},
		{
			provide: TNK_REPOSITORY,
			useFactory: (logger: ILogger, eventBus: IEventBus, storage: IDatabaseConnection) => {
				return new TnkEventRepository(logger, eventBus, storage)
			},
			inject: ['CustomLogger', EVENT_BUS, POSTGRES_STORAGE],
		},
		{
			provide: DICTIONARY_REPOSITORY,
			useFactory: (logger: ILogger, eventBus: IEventBus, storage: IDatabaseConnection) => {
				return new DictionaryRepository(logger, eventBus, storage)
			},
			inject: ['CustomLogger', EVENT_BUS, POSTGRES_STORAGE],
		},
		{
			provide: PROCESS_REPOSITORY,
			useFactory: (logger: ILogger, eventBus: IEventBus, storage: IDatabaseConnection) => {
				return new ProcessRepository(logger, eventBus, storage)
			},
			inject: ['CustomLogger', EVENT_BUS, POSTGRES_STORAGE],
		},
		{
			provide: SUBPROCESS_REPOSITORY,
			useFactory: (logger: ILogger, eventBus: IEventBus, storage: IDatabaseConnection) => {
				return new SubprocessRepository(logger, eventBus, storage)
			},
			inject: ['CustomLogger', EVENT_BUS, POSTGRES_STORAGE],
		},
	],
	exports: [USER_REPOSITORY, TNK_REPOSITORY, DICTIONARY_REPOSITORY, PROCESS_REPOSITORY, SUBPROCESS_REPOSITORY],
})
export class RepositoryModule {}
