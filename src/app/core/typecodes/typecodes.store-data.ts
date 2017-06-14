import { TypecodeModel, AllTypeCodesModel } from './typecode.model';
export interface TypeCodesStoreData {
    categories: TypecodeModel[];
    priorities: TypecodeModel[];
    origins: TypecodeModel[];
    causes: TypecodeModel[];
    statuses: TypecodeModel[];
    subcategories: TypecodeModel[];
// typecodes: AllTypeCodesModel
}

export const INITIAL_TYPECODES_STORE_DATA: TypeCodesStoreData = {
    categories: [],
    priorities: [],
    origins: [],
    causes: [],
    statuses: [],
    subcategories: []
    // typecodes: {}
};