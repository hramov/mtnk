import {ValueObject} from "../../../Shared/src/ValueObject/ValueObject";

export type ApprovingItemConstructor = {
    tnkId: string;
    groupNum: number;
    userId: string;
    isActive: boolean;
    isApproved: boolean | null;
    comments?: string;
    dateCreated?: Date;
}

export class ApprovingItem extends ValueObject {
    public tnkId: string;
    public groupNum: number;
    public userId: string;
    public isActive: boolean;
    public isApproved: boolean | null;
    public comments?: string;
    public dateCreated?: Date;

    constructor(item: ApprovingItemConstructor) {
        super();
        this.tnkId = item.tnkId;
        this.groupNum = item.groupNum;
        this.userId = item.userId;
        this.isActive = item.isActive;
        this.isApproved = item.isApproved;
        this.comments = item.comments;
        this.dateCreated = item.dateCreated;
    }
    protected *getEqualityComponents(): IterableIterator<Object> {
        yield this.tnkId;
        yield this.groupNum;
        yield this.userId;
        yield this.isActive;
        yield this.isApproved;
        yield this.comments;
        yield this.dateCreated;
    }

}