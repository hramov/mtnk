import { Inject, Injectable } from '@nestjs/common';
import { AUTH_REPOSITORY } from '../../common/database/postgres/repository/Repository.constants';
import { LoginDto } from './dto/LoginDto';
import { AUTH_AGGREGATE } from './auth.constants';
import {ILogger} from "../../../../Core/ICore";
import {LoginOrPasswordIncorrectError} from "../../../../Core/Auth/Error/LoginOrPasswordIncorrect.error";
import {Token} from "../../../../Core/Auth/Entity/Token";
import {Auth} from "../../../../Core/Auth/Auth";
import {IAuthRepository} from "../../../../Core/Auth/IAuthRepository";

@Injectable()
export class AuthService {
	constructor(
		@Inject('CustomLogger') private readonly logger: ILogger,
		@Inject(AUTH_REPOSITORY)
		private readonly authRepository: IAuthRepository,
		@Inject(AUTH_AGGREGATE) private readonly authAggregate: Auth,
	) {}

	async login(dto: LoginDto): Promise<Token | LoginOrPasswordIncorrectError> {
		// const candidate = await this.authRepository.getCandidateByUsername(
		// 	dto.username,
		// );
		// candidate.plainPassword = dto.plainPassword;
		// candidate.isRemember = dto.isRemember;
		// this.authAggregate.setCandidate(candidate);
		//
		// const result = this.authAggregate.login();
		//
		// if (result instanceof Token) {
		// 	this.logger.log(
		// 		`User ${candidate.username} has successfilly logged in`,
		// 		'AuthService',
		// 		{
		// 			method: 'login',
		// 		},
		// 	);
		// } else {
		// 	this.logger.log(
		// 		`Login for user ${candidate.username} has been declined`,
		// 		'AuthService',
		// 		{
		// 			method: 'login',
		// 		},
		// 	);
		// }
		//
		// return result;
		return null;
	}
}
