import {ValueObject} from "../../../Shared/src/ValueObject/ValueObject";
import {Uuid} from "../../../Shared/src/ValueObject/Objects/Uuid";

export const enum HistoryTypes {
    Tnk,
    ConfigItem,
    WorkGroup,
    Operation
}

export type HistoryConstructor = {
    tnkId: number;
    type: HistoryTypes;
    title: string;
    dateCreated: Date;
    lastUpdated: Date;
    userId: Uuid;
}

export class History extends ValueObject {
    private readonly tnkId: number;
    private readonly type: HistoryTypes;
    private readonly title: string;
    private readonly dateCreated: Date;
    private readonly lastUpdated: Date;
    private readonly userId: Uuid;

    constructor(history: HistoryConstructor) {
        super();
        this.tnkId = history.tnkId;
        this.type = history.type;
        this.title = history.title;
        this.dateCreated = history.dateCreated;
        this.lastUpdated = history.lastUpdated;
        this.userId = history.userId
    }

    protected *getEqualityComponents(): IterableIterator<Object> {
        yield this.tnkId;
        yield this.type;
        yield this.title;
        yield this.dateCreated;
        yield this.lastUpdated;
        yield this.userId;
    }
}