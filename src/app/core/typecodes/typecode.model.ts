export interface TypecodeModel {
    id: number;
    name: string;
}

export interface AllTypeCodesModel {
    itComponentTypes?: TypecodeModel[],
    priorityTypes?: TypecodeModel[],
    requestTypes?: TypecodeModel[],
    sourceTypes?: TypecodeModel[],
    statusTypes?: TypecodeModel[],
    subcomponentTypes?: TypecodeModel[]

}