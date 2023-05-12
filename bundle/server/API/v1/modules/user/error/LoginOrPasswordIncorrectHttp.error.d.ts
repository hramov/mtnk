import { HttpException } from '@nestjs/common';
import { LoginOrPasswordIncorrectError } from "../../../../../Core/User/Error/LoginOrPasswordIncorrect.error";
export declare function LoginOrPasswordIncorrectException(error: LoginOrPasswordIncorrectError): HttpException;
