import { Module } from '@nestjs/common';
import { CustomLoggerService } from './custom-logger.service';
import { AsyncLocalStorageModule } from '../asyncLocalStorage/asyncLocalStorage.module';

@Module({
	imports: [AsyncLocalStorageModule],
	providers: [
		{
			provide: 'CustomLogger',
			useClass: CustomLoggerService,
		},
	],
	exports: ['CustomLogger'],
})
export class LoggerModule {}
