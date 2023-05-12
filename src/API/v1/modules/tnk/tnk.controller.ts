import {Body, Controller, Get, Post} from '@nestjs/common';
import {TnkService} from "./tnk.service";
import {TokenData} from "../../../../Core/User/ValueObject/TokenData";
import {GetUser} from "../user/user.decorator";
import {ApproveData} from "../../../../Core/Tnk/ValueObject/ApproveData";

@Controller('tnk')
export class TnkController {
    constructor(private readonly tnkService: TnkService) {}

    @Post('/approve')
    async approve(@GetUser() user: TokenData, @Body() dto: ApproveData) {
        return this.tnkService.approve(user, dto);
    }

    @Get('/to-approve')
    async getTnkToApprove(@GetUser() user: TokenData) {
        return this.tnkService.getTnkToApprove(user);
    }
}
