import {Inject, Injectable} from "@nestjs/common";
import {Candidate} from "../../../../Core/User/ValueObject/Candidate";
import {LoginOrPasswordIncorrectError} from "../../../../Core/User/Error/LoginOrPasswordIncorrect.error";
import {compare} from "bcrypt";
import {ILogger} from "../../../../Core/ICore";
import {JwtService} from "@nestjs/jwt";
import {Token} from "../../../../Core/User/ValueObject/Token";
import {GenerateTokenError} from "../../../../Core/User/Error/GenerateToken.error";
import { UserConstructor } from '../../../../Core/User/User';
import {IUserRepository} from "../../../../Core/User/IUserRepository";
import { USER_EVENT_REPOSITORY, USER_REPOSITORY } from '../../common/persistent/repository/repository.constants';
import {DatabaseError} from "../../../../Core/Error/Database.error";
import { LOGGER } from '../../common/constants';
import { IUserEventRepository } from '../../../../Core/User/Repository/event/IUserEventRepository';

@Injectable()
export class UserService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(LOGGER) private readonly logger: ILogger,
        @Inject(USER_EVENT_REPOSITORY) private readonly eventRepository: IUserEventRepository,
        @Inject(USER_REPOSITORY) private readonly repository: IUserRepository
    ) {}

    public async login(dto: Candidate): Promise<Token | Error> {
        const userData = await this.repository.getUserForLogin(dto.username);
        if (userData instanceof DatabaseError) {
            return userData;
        }

        const passwordsEqual = await compare(dto.plainPassword, userData.hashedPassword)

        if (!passwordsEqual) {
            this.logger.log(
                `Login for user ${dto.username} declined`,
                'UserService',
                {
                    method: 'login',
                },
            );
            return new LoginOrPasswordIncorrectError()
        }

        const user = await this.eventRepository.getByAggregateId(userData.userId);
        if (user instanceof DatabaseError) {
            return user;
        }


        const token = new Token();

        try {
            token.accessToken = await this.jwtService.signAsync({
                userId: user.userId,
                username: user.username,
                role: user.profile.role,
            });
        } catch(err) {
            this.logger.log(
                `Error while generating token: ${err}`,
                'UserService',
                {
                    method: 'login',
                },
            );
            return new GenerateTokenError();
        }

        this.logger.log(
            `User ${dto.username} has successfully logged in`,
            'UserService',
            {
                method: 'login',
            },
        );
        return token;
    }

    public async getUserInfo(userId: string): Promise<UserConstructor | Error > {
        return this.eventRepository.getByAggregateId(userId);
    }
}