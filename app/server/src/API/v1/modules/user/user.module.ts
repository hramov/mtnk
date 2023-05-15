import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { LoggerModule } from '../../common/logger/logger.module';
import { RepositoryModule } from '../../common/persistent/repository/repository.module';
import {JwtModule} from "@nestjs/jwt";
import {APP_GUARD} from "@nestjs/core";
import {AuthGuard} from "./user.guard";
import {UserService} from "./user.service";

@Module({
	imports: [LoggerModule, RepositoryModule,
		JwtModule.register({
		global: true,
		secret: process.env.TOKEN_KEY,
		signOptions: { expiresIn: '2h' },
	})],
	controllers: [UserController],
	providers: [
		UserService,
		// {
		// 	provide: APP_GUARD,
		// 	useClass: AuthGuard,
		// },
	],
})
export class UserModule {}
