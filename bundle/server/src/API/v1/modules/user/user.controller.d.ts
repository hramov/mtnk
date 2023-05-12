import { UserService } from "./user.service";
import { Candidate } from "../../../../Core/User/ValueObject/Candidate";
import { TokenData } from "../../../../Core/User/ValueObject/TokenData";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    login(dto: Candidate): Promise<Error | import("../../../../Core/User/Entity/Token").Token>;
    info(user: TokenData): Promise<Error | import("../../../../Core/User/User").User>;
}
