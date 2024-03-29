import { LoginActions } from './login-actions';
import { LoginStoreData } from './login.store-data';
import { Action } from '@ngrx/store';
export function loginStoreData(state: LoginStoreData, action: Action): LoginStoreData {
    switch (action.type) {
        case LoginActions.LOGIN_USER_SUCCESS:
            return {
                user: action.payload.user
                
            }
        default:
            return state;
    }

}