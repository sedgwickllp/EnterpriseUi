import { TypecodesService } from './typecodes.service';
import { Injectable } from '@angular/core';
import { TypecodesActions } from './typecodes-actions';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';
import { Action } from '@ngrx/store';
@Injectable()
export class TypecodesEffects {
    constructor(private actions$: Actions,
    private typecodesService: TypecodesService,
    private typecodesActions: TypecodesActions) {
        
    }

    @Effect() loadTypecodes$: Observable<Action> = this.actions$
        .ofType(TypecodesActions.LOAD_ALL_TYPECODES)
        .switchMap(action => this.typecodesService.getTypecodes())
        .map(typecodes => this.typecodesActions.loadTypecodesSuccess(typecodes));
}