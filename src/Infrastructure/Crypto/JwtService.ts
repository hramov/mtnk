import {IJwtService} from "../../Core/ICore";
import {GenerateTokenDto} from "../../Core/Auth/Dto/GenerateToken.dto";
import {Token} from "../../Core/Auth/Entity/Token";

export class JwtService implements IJwtService {
	async generateTokenPair(dto: GenerateTokenDto): Promise<GenerateTokenDto> {
		const token = new Token();
		token.accessToken = '123';
		token.refreshToken = '321';

		return token;
	}
}
