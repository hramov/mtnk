import { Module } from '@nestjs/common';
import {LoggerModule} from "./common/logger/logger.module";
import {UserModule} from "./modules/user/user.module";
import {TnkModule} from "./modules/tnk/tnk.module";

@Module({
  imports: [LoggerModule, UserModule, TnkModule],
})
export class AppModule {}
