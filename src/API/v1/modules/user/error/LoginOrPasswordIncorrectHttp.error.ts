import { HttpException, HttpStatus } from '@nestjs/common';
import {LoginOrPasswordIncorrectError} from "../../../../../Core/User/Error/LoginOrPasswordIncorrect.error";

export function LoginOrPasswordIncorrectHttpError(
	error: LoginOrPasswordIncorrectError,
) {
	return new HttpException(
		{
			status: HttpStatus.FORBIDDEN,
			error: error.message,
		},
		HttpStatus.FORBIDDEN,
		{
			cause: error,
		},
	);
}
