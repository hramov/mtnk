import {ValueObject} from "../../../Shared/src/ValueObject/ValueObject";
import {TnkType} from "../TnkType";
import {TnkDetalization} from "../TnkDetalization";

export class TnkBody extends ValueObject {

    public title: string;
    public type: TnkType;
    public processId: number;
    public subprocessId: number;
    public isActive: boolean;
    public isDigital: boolean;
    public tnkDetalization: TnkDetalization

    protected *getEqualityComponents(): IterableIterator<Object> {
        return undefined;
    }
}