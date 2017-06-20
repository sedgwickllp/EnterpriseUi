import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { LoginActions } from './login-actions';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';
import { Action } from '@ngrx/store';
@Injectable()
export class LoginEffects {
    constructor(private actions$: Actions,
    private loginService: LoginService,
    private loginActions: LoginActions) {
        
    }

    @Effect() loginUser$: Observable<Action> = this.actions$
        .ofType(LoginActions.LOGIN_USER)
        .switchMap(action => this.loginService.getUser())
        .map(user => this.loginActions.loginUserSuccess(user));
}