import { TypecodesActions } from './typecodes-actions';
import { TypeCodesStoreData } from './typecodes.store-data';
import { Action } from '@ngrx/store';
import { statusType } from '../../tickets/models/types.model';
export function typecodesStoreData(state: TypeCodesStoreData, action: Action): TypeCodesStoreData {
    switch (action.type) {
        case TypecodesActions.ALL_TYPECODES_LOAD_SUCCESS:
            return {
                components: action.payload.itComponentTypes,
                priorities: action.payload.priorityTypes,
                requests: action.payload.requestTypes,
                sources: action.payload.sourceTypes,
                statuses: action.payload.statusTypes,
                subComponents: action.payload.subComponentTypes
            }
        default:
            return state;
    }

}