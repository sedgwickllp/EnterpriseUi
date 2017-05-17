import { TypecodeModel, AllTypeCodesModel } from './typecode.model';
export interface TypeCodesStoreData {
    components: TypecodeModel[];
    priorities: TypecodeModel[];
    requests: TypecodeModel[];
    sources: TypecodeModel[];
    statuses: TypecodeModel[];
    subComponents: TypecodeModel[];
// typecodes: AllTypeCodesModel
}

export const INITIAL_TYPECODES_STORE_DATA: TypeCodesStoreData = {
    components: [],
    priorities: [],
    requests: [],
    sources: [],
    statuses: [],
    subComponents: []
    // typecodes: {}
};