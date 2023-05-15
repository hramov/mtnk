import {BadRequestException, Body, Controller, Post} from '@nestjs/common';
import {TnkService} from "./tnk.service";
import {GetUser} from "../user/user.decorator";
import {Public} from "../user/public.decorator";
import {TnkConstructor} from "../../../../Core/Tnk/Tnk";
import {UserJWTPayloadDto} from "../user/dto/userJWTPayload.dto";

@Controller('tnk')
export class TnkController {
    constructor(private readonly tnkService: TnkService) {}

    @Post('/')
    @Public()
    async create(@GetUser() user: UserJWTPayloadDto, @Body() tnk: TnkConstructor) {
        if (!user || !user.userId || !user.userIp) {
            throw new BadRequestException();
        }
        return this.tnkService.create(tnk, user.userId, user.userIp)
    }

}
