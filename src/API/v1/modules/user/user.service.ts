import {Inject, Injectable} from "@nestjs/common";
import {Candidate} from "../../../../Core/User/ValueObject/Candidate";
import {LoginOrPasswordIncorrectError} from "../../../../Core/User/Error/LoginOrPasswordIncorrect.error";
import {compare} from "bcrypt";
import {ILogger} from "../../../../Core/ICore";
import {JwtService} from "@nestjs/jwt";
import {Token} from "../../../../Core/User/Entity/Token";
import {GenerateTokenError} from "../../../../Core/User/Error/GenerateToken.error";
import {Uuid} from "../../../../Shared/src/ValueObject/Objects/Uuid";
import {User} from "../../../../Core/User/User";
import {IUserRepository} from "../../../../Core/User/IUserRepository";
import {USER_REPOSITORY} from "../../common/database/repository/repository.constants";

@Injectable()
export class UserService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject('CustomLogger') private readonly logger: ILogger,
        @Inject(USER_REPOSITORY) private readonly repository: IUserRepository
    ) {}

    public async login(dto: Candidate): Promise<Token | Error> {
        const userData = await this.repository.getUserByUsername(dto.username);
        const user = userData.getUserForLogin()
        const passwordsEqual = await compare(dto.plainPassword, user.password.toString())

        if (!passwordsEqual) {
            this.logger.log(
                `login for user ${dto.username} declined`,
                'UserService',
                {
                    method: 'login',
                },
            );
            return new LoginOrPasswordIncorrectError()
        }

        const token = new Token()

        try {
            token.accessToken = await this.jwtService.signAsync({
                userId: user.id,
                username: user.username,
                role: user.role,
            });
        } catch(err) {
            this.logger.log(
                `error while generating token: ${err}`,
                'UserService',
                {
                    method: 'login',
                },
            );
            return new GenerateTokenError();
        }

        this.logger.log(
            `user ${dto.username} has successfully logged in`,
            'UserService',
            {
                method: 'login',
            },
        );
        return token;
    }

    public async getUserInfo(userId: Uuid): Promise<User | Error > {
        	const userData = await this.repository.getUserById(userId);
        	return userData.getUserInfo();
    }
}