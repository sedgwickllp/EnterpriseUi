import { TypecodesActions } from './typecodes-actions';
import { TypeCodesStoreData } from './typecodes.store-data';
import { Action } from '@ngrx/store';
import { statusType } from '../../tickets/models/types.model';
export function typecodesStoreData(state: TypeCodesStoreData, action: Action): TypeCodesStoreData {
    switch (action.type) {
        case TypecodesActions.ALL_TYPECODES_LOAD_SUCCESS:
            return {
                categories: action.payload.CategoryTypes,
                priorities: action.payload.PriorityTypes,
                origins: action.payload.OriginTypes,
                causes: action.payload.CauseTypes,
                statuses: action.payload.StatusTypes,
                subcategories: action.payload.SubCategoryTypes
            }
        default:
            return state;
    }

}