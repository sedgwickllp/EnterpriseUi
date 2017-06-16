/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';
import { OidcSecurityService } from './auth/services/oidc.security.service';
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './scss/application.scss'
  ],
  template: `<router-outlet></router-outlet>`
})
export class App {

  constructor(
    public appState: AppState, public securityService: OidcSecurityService) {

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
    console.log('ngOnInit _securityService.AuthorizedCallback')
    if (window.location.hash && window.location.hash.substr(1,1) != "/") {
      console.log(window.location.hash.substr(1,1))
         //   this.securityService.AuthorizedCallback();
    }
    else {
        // this.securityService.Authorize();
    }
        
        //this.securityService.ExternalLogin();
  }

}
