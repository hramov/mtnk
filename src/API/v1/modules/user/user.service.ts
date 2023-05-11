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
import {DatabaseError} from "../../error/Database.error";

@Injectable()
export class UserService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject('CustomLogger') private readonly logger: ILogger,
        @Inject(USER_REPOSITORY) private readonly repository: IUserRepository
    ) {}

    public async login(dto: Candidate): Promise<Token | Error> {
        const user = await this.repository.getUserByUsername(dto.username);
        if (user instanceof DatabaseError) {
            return user;
        }

        const loginData = user.getUserForLogin();

        const passwordsEqual = await compare(dto.plainPassword, loginData.password.toString())

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

        const token = new Token()

        try {
            token.accessToken = await this.jwtService.signAsync({
                userId: loginData.id,
                username: loginData.username,
                role: loginData.role,
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

    public async getUserInfo(userId: Uuid): Promise<User | Error > {
        const user = await this.repository.getUserById(userId);
        if (user instanceof Error) {
            return user;
        }
        return user.getUserInfo();
    }
}