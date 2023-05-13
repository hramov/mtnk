import { Module } from '@nestjs/common';
import { TnkService } from './tnk.service';
import { TnkController } from './tnk.controller';
import {LoggerModule} from "../../common/logger/logger.module";
import {RepositoryModule} from "../../common/persistent/repository/repository.module";

@Module({
  imports: [LoggerModule, RepositoryModule],
  providers: [TnkService],
  controllers: [TnkController]
})
export class TnkModule {}
