import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PostgresModule } from '../../common/database/postgres/postgres.module';
import { LoggerModule } from '../../common/logger/logger.module';
import { RepositoryModule } from '../../common/database/postgres/repository/Repository.module';
import { AuthService } from './auth.service';
import { AUTH_AGGREGATE } from './auth.constants';
import {ILogger} from "../../../../Core/ICore";
import {CryptoService} from "../../../../Infrastructure/Crypto/CryptoService";
import {JwtService} from "../../../../Infrastructure/Crypto/JwtService";
import {Auth} from "../../../../Core/Auth/Auth";

@Module({
	imports: [PostgresModule, LoggerModule, RepositoryModule],
	controllers: [AuthController],
	providers: [
		AuthService,
		{
			provide: AUTH_AGGREGATE,
			useFactory: (logger: ILogger) => {
				return new Auth(logger, new CryptoService(), new JwtService());
			},
			inject: ['CustomLogger'],
		},
	],
})
export class AuthModule {}
