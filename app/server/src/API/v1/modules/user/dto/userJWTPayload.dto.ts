import {Uuid} from "../../../../../Shared/src/ValueObject/Objects/Uuid";
import {Ip} from "../../../../../Shared/src/ValueObject/Objects/Ip";

export class UserJWTPayloadDto {
    userId: string;
    username: string;
    role: string;
    userIp: Ip;
}