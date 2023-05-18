import { Module } from '@nestjs/common';
import {LoggerModule} from "./common/logger/logger.module";
import {UserModule} from "./modules/user/user.module";
import {TnkModule} from "./modules/tnk/tnk.module";
import { DictionaryModule } from './modules/dictionary/dictionary.module';
import { AihModule } from './modules/aih/aih.module';

@Module({
  imports: [LoggerModule, UserModule, TnkModule, DictionaryModule, AihModule],
})
export class AppModule {}
