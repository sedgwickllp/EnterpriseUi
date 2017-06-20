import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
@Injectable()
export class LoginActions {
    static LOGIN_USER = '[USER] Login';
    static LOGIN_USER_SUCCESS = '[USER] Login Success';

    loginUser(): Action {
        return {
            type: LoginActions.LOGIN_USER
        };
    }
    loginUserSuccess(user): Action {
        return {
            type: LoginActions.LOGIN_USER_SUCCESS,
            payload: user
        };
    }
}