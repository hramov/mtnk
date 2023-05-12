import { ILogger } from "../../../../Core/ICore";
import { IDictionaryRepository } from "../../../../Core/IDictionaryRepository";
import { DatabaseError } from "../../error/Database.error";
export declare const enum DictionaryType {
    Process = 0,
    Subprocess = 1,
    Operation = 2
}
export interface ImportDictionary {
    rows: string;
    type: DictionaryType;
}
export declare class DictionaryService {
    private readonly logger;
    private readonly repository;
    constructor(logger: ILogger, repository: IDictionaryRepository);
    getActiveRoles(): Promise<import("../../../../Core/User/Entity/Role").Role[]>;
    getAllDictItems(): Promise<any[]>;
    getEditableDictTypes(): Promise<any[]>;
    importDictionaries(params: ImportDictionary, account_id: any): Promise<void | DatabaseError>;
}
