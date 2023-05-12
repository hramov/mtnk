import { TnkService } from "./tnk.service";
import { TokenData } from "../../../../Core/User/ValueObject/TokenData";
import { ApproveData } from "../../../../Core/Tnk/ValueObject/ApproveData";
export declare class TnkController {
    private readonly tnkService;
    constructor(tnkService: TnkService);
    approve(user: TokenData, dto: ApproveData): Promise<number | Error>;
    getTnkToApprove(user: TokenData): Promise<number | Error>;
}
