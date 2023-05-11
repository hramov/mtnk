import {Controller, Post, Body, Get, InternalServerErrorException} from '@nestjs/common';
import {
	LoginOrPasswordIncorrectException,
} from './error/LoginOrPasswordIncorrectHttp.error';
import {LoginOrPasswordIncorrectError} from "../../../../Core/User/Error/LoginOrPasswordIncorrect.error";
import {UserService} from "./user.service";
import {Candidate} from "../../../../Core/User/ValueObject/Candidate";
import {GetUser} from "./user.decorator";
import {TokenData} from "../../../../Core/User/ValueObject/TokenData";
import {Public} from "./public.decorator";
import {DatabaseError} from "../../error/Database.error";

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('login')
	@Public()
	async login(@Body() dto: Candidate) {
		const result = await this.userService.login(dto);
		if (result instanceof DatabaseError) {
			throw InternalServerErrorException;
		} else if (result instanceof LoginOrPasswordIncorrectError) {
			throw LoginOrPasswordIncorrectException(result);
		}
		return result;
	}

	@Get('info')
	async info(@GetUser() user: TokenData) {
		return this.userService.getUserInfo(user.userId);
	}
}
