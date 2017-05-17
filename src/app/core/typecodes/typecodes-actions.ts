import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
@Injectable()
export class TypecodesActions {
    static LOAD_ALL_TYPECODES = '[AllTypecodes] Load';
    static ALL_TYPECODES_LOAD_SUCCESS = '[AllTypecodes] Load Success';

    getAllTypecodes(): Action {
        return {
            type: TypecodesActions.LOAD_ALL_TYPECODES
        };
    }
    loadTypecodesSuccess(typecodes): Action {
        return {
            type: TypecodesActions.ALL_TYPECODES_LOAD_SUCCESS,
            payload: typecodes
        };
    }
}