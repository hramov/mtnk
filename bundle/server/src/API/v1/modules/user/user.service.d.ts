import { Candidate } from "../../../../Core/User/ValueObject/Candidate";
import { ILogger } from "../../../../Core/ICore";
import { JwtService } from "@nestjs/jwt";
import { Token } from "../../../../Core/User/Entity/Token";
import { Uuid } from "../../../../Shared/src/ValueObject/Objects/Uuid";
import { User } from "../../../../Core/User/User";
import { IUserRepository } from "../../../../Core/User/IUserRepository";
export declare class UserService {
    private readonly jwtService;
    private readonly logger;
    private readonly repository;
    constructor(jwtService: JwtService, logger: ILogger, repository: IUserRepository);
    login(dto: Candidate): Promise<Token | Error>;
    getUserInfo(userId: Uuid): Promise<User | Error>;
}
