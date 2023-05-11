import { Module } from '@nestjs/common';
import { AUTH_REPOSITORY, MTNK_REPOSITORY } from './Repository.constants';

@Module({
	providers: [
		{
			provide: AUTH_REPOSITORY,
			useFactory: () => {},
			inject: [],
		},
		{
			provide: MTNK_REPOSITORY,
			useFactory: () => {},
		},
	],
	exports: [AUTH_REPOSITORY, MTNK_REPOSITORY],
})
export class RepositoryModule {}
