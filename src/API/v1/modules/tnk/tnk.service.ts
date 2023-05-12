import {Inject, Injectable} from '@nestjs/common';
import {TokenData} from "../../../../Core/User/ValueObject/TokenData";
import {ApproveData} from "../../../../Core/Tnk/ValueObject/ApproveData";
import {TNK_REPOSITORY} from "../../common/persistent/repository/repository.constants";

@Injectable()
export class TnkService {

    constructor(@Inject(TNK_REPOSITORY) private readonly tnkRepository) {}

    async create() {}

    async update() {}

    async search() {}

    async show() {}

    async approve(user: TokenData, dto: ApproveData) {}

    async getTnkToApprove(user: TokenData) {}
}
