export interface TypecodeModel {
    id: number;
    name: string;
}

export interface AllTypeCodesModel {
    categoryTypes?: TypecodeModel[],
    priorityTypes?: TypecodeModel[],
    originTypes?: TypecodeModel[],
    causeTypes?: TypecodeModel[],
    statusTypes?: TypecodeModel[],
    subcategoryTypes?: TypecodeModel[]

}