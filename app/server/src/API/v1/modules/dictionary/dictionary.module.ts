import { Module } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { DictionaryController } from './dictionary.controller';
import {LoggerModule} from "../../common/logger/logger.module";
import {RepositoryModule} from "../../common/persistent/repository/repository.module";

@Module({
  imports: [LoggerModule, RepositoryModule],
  providers: [DictionaryService],
  controllers: [DictionaryController]
})
export class DictionaryModule {}
