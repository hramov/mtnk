import { Module } from '@nestjs/common';
import {LoggerModule} from "../../common/logger/logger.module";
import {RepositoryModule} from "../../common/persistent/repository/repository.module";
import { AihService } from './aih.service';
import { AihController } from './aih.controller';

@Module({
	imports: [LoggerModule, RepositoryModule],
	providers: [AihService],
	controllers: [AihController],
	exports: [AihService]
})
export class AihModule {}
