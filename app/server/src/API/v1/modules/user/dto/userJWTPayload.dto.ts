import {Uuid} from "../../../../../Shared/src/ValueObject/Objects/Uuid";
import {Ip} from "../../../../../Shared/src/ValueObject/Objects/Ip";

export class UserJWTPayloadDto {
    userId: Uuid;
    username: string;
    role: string;
    userIp: Ip;
}