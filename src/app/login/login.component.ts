import { Component, ViewEncapsulation, OnInit } from '@angular/core';
//import { LoginActions } from './login-actions';
import { Store } from '@ngrx/store';
import { UserModel } from './models/user.model';
import { Observable } from 'rxjs';
import { ApplicationState } from '../application.state';
import { OidcSecurityService } from '../auth/services/oidc.security.service';
@Component({
  selector: 'login',
  styleUrls: [ './login.style.scss' ],
  templateUrl: './login-template.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'login-page app'
  }
})
export class Login implements OnInit {
  user$: Observable<UserModel>;
  constructor(private store: Store<ApplicationState>, private securityService: OidcSecurityService) {
      this.user$ = store.select(this.userSelector);
  }
  ngOnInit() {
      //this.store.dispatch(this.loginActions.loginUser());
    if (window.location.hash && window.location.hash.substr(1,1) != "/") {
      console.log(window.location.hash)
            this.securityService.AuthorizedCallback();
    }
    else {
         this.securityService.Authorize();
    }

  }

  userSelector(state: ApplicationState): UserModel {
        if (state.loginStoreData) {
            return state.loginStoreData.user;
         }
    }
  
}


  

    

    

   

