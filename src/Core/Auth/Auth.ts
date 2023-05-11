import {ICryptoService, IJwtService, ILogger} from "../ICore";

export class Auth {
    constructor(private readonly logger: ILogger, private readonly cryptoService: ICryptoService, private readonly jwtService: IJwtService) {}
}