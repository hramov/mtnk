import {ValueObject} from "../../../Shared/src/ValueObject/ValueObject";

export type ApprovingItemConstructor = {
    tnkId: string;
    group: number;
    userId: string;
    isActive: boolean;
}

export class ApprovingItem extends ValueObject {
    public tnkId: string;
    public group: number;
    public userId: string;
    public isActive: boolean;

    constructor(item: ApprovingItemConstructor) {
        super();
        this.tnkId = item.tnkId;
        this.group = item.group;
        this.userId = item.userId;
        this.isActive = item.isActive;
    }
    protected *getEqualityComponents(): IterableIterator<Object> {
        yield this.tnkId;
    }

}