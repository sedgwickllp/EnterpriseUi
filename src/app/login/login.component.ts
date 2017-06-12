import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { LoginActions } from './login-actions';
import { Store } from '@ngrx/store';
import { UserModel } from './models/user.model';
import { Observable } from 'rxjs';
import { ApplicationState } from '../application.state';
@Component({
  selector: 'login',
  styleUrls: [ './login.style.scss' ],
  templateUrl: './login.template.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'login-page app'
  }
})
export class Login implements OnInit {
  user$: Observable<UserModel>;
  constructor(private store: Store<ApplicationState>, private loginActions: LoginActions) {
      this.user$ = store.select(this.userSelector);
  }
  ngOnInit() {
      this.store.dispatch(this.loginActions.loginUser());
    

  }

  userSelector(state: ApplicationState): UserModel {
        if (state.LoginStoreData) {
            return state.LoginStoreData.user;
         }
    }
  
}


  

    

    

   

