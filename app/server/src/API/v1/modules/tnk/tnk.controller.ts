import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {TnkService} from "./tnk.service";
import {TokenData} from "../../../../Core/User/ValueObject/TokenData";
import {GetUser} from "../user/user.decorator";
import {ApproveData} from "../../../../Core/Tnk/ValueObject/ApproveData";
import {ProcessSearchParams} from "../../../../Core/Tnk/Repository/IProcessRepository";
import {Public} from "../user/public.decorator";

@Controller('tnk')
export class TnkController {
    constructor(private readonly tnkService: TnkService) {}

    @Get('')
    async getTnk() {
        return this.tnkService.getTnk();
    }

    @Post('/approve')
    async approve(@GetUser() user: TokenData, @Body() dto: ApproveData) {
        return this.tnkService.approve(user, dto);
    }

    @Get('/to-approve')
    async getTnkToApprove(@GetUser() user: TokenData) {
        return this.tnkService.getTnkToApprove(user);
    }

    @Get('/process')
    @Public()
    async getProcesses(@Param('title') title: string) {
        const params: ProcessSearchParams = {
            title: title
        }
        return this.tnkService.getProcesses(params);
    }

    @Get('/subprocess')
    async getSubprocesses() {
        return this.tnkService.getSubprocesses();
    }
}
