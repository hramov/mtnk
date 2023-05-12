import { ValueObject } from "../../../Shared/src/ValueObject/ValueObject";
import { TnkType } from "../TnkType";
import { TnkDetalization } from "../TnkDetalization";
export declare class TnkBody extends ValueObject {
    title: string;
    type: TnkType;
    processId: number;
    subprocessId: number;
    isActive: boolean;
    isDigital: boolean;
    isAutomated: string;
    tnkDetalization: TnkDetalization;
    statusId: number;
    protected getEqualityComponents(): IterableIterator<Object>;
}
