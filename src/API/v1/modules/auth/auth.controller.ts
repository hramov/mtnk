import { Controller, Post, Body } from '@nestjs/common';
import { LoginOrPasswordIncorrectHttpError } from './error/LoginOrPasswordIncorrectHttp.error';
import { LoginDto } from './dto/LoginDto';
import { AuthService } from './auth.service';
import {LoginOrPasswordIncorrectError} from "../../../../Core/Auth/Error/LoginOrPasswordIncorrect.error";

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(@Body() dto: LoginDto) {
		const result = await this.authService.login(dto);

		if (result instanceof LoginOrPasswordIncorrectError) {
			throw LoginOrPasswordIncorrectHttpError(result);
		}

		return result;
	}
}
