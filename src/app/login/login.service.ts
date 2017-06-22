import { Injectable } from '@angular/core';
import { UserModel } from './models/User.model';
import {Http, Headers} from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { OidcSecurityService } from '../auth/services/oidc.security.service';
@Injectable()
export class LoginService {
    constructor(private http: Http, private securityService: OidcSecurityService) { }
    // api calls go here
    getUser(): UserModel {
        //this.headers.
        console.log('in login service and retrieving user');
        return { userId:'1', userName: 'test'};
        //return this.securityService.Authorize();
            //.map(x => x.json()); // creates the  "payload" on the next line
        //.map(payload => ({type: 'ADD_TICKET_LIST', payload: payload})) // creates the "action"
        //.subscribe(action => this._store.dispatch(action)); // dispatches the action
    }
   
   
}