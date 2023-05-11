import {Controller, Post, Body, Get} from '@nestjs/common';
import { LoginOrPasswordIncorrectHttpError } from './error/LoginOrPasswordIncorrectHttp.error';
import {LoginOrPasswordIncorrectError} from "../../../../Core/User/Error/LoginOrPasswordIncorrect.error";
import {UserService} from "./user.service";
import {Candidate} from "../../../../Core/User/ValueObject/Candidate";
import {GetUser} from "./user.decorator";
import {TokenData} from "../../../../Core/User/ValueObject/TokenData";

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('login')
	async login(@Body() dto: Candidate) {
		const result = await this.userService.login(dto);
		if (result instanceof LoginOrPasswordIncorrectError) {
			throw LoginOrPasswordIncorrectHttpError(result);
		}
		return result;
	}

	@Get('info')
	async info(@GetUser() user: TokenData) {
		return this.userService.getUserInfo(user.userId);
	}
}
