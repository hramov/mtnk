import { Module } from '@nestjs/common';
import {LoggerModule} from "./common/logger/logger.module";
import {AuthModule} from "./modules/auth/auth.module";
import {TnkModule} from "./modules/tnk/tnk.module";

@Module({
  imports: [LoggerModule, AuthModule, TnkModule],
})
export class AppModule {}
