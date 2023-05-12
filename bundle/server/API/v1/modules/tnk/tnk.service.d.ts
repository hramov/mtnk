import { TokenData } from "../../../../Core/User/ValueObject/TokenData";
import { ApproveData } from "../../../../Core/Tnk/ValueObject/ApproveData";
import { ITnkRepository } from "../../../../Core/Tnk/ITnkRepository";
import { TnkBody } from "../../../../Core/Tnk/ValueObject/TnkBody";
import { Tnk } from "../../../../Core/Tnk/Tnk";
import { DatabaseError } from "../../error/Database.error";
import { TnkSearchParams } from "../../../../Core/Tnk/ValueObject/TnkSearchParams";
import { IDictionaryRepository } from "../../../../Core/IDictionaryRepository";
export declare class TnkService {
    private readonly tnkRepository;
    private readonly dictRepository;
    constructor(tnkRepository: ITnkRepository, dictRepository: IDictionaryRepository);
    create(dto: TnkBody): Promise<Tnk | DatabaseError>;
    update(dto: TnkBody, id: number): Promise<Tnk | DatabaseError>;
    addConfigItem(title: string, tnkId: number): Promise<Tnk | DatabaseError>;
    addWorkGroup(title: string, tnkId: number): Promise<Tnk | DatabaseError>;
    addOperation(title: string, tnkId: number): Promise<Tnk | DatabaseError>;
    search(searchParams: TnkSearchParams): Promise<Tnk[] | DatabaseError>;
    show(tnkId: number): Promise<Tnk | DatabaseError>;
    approve(user: TokenData, dto: ApproveData): Promise<number | Error>;
    getTnkToApprove(user: TokenData): Promise<number | Error>;
}
