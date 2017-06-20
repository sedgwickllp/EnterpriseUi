import { Injectable } from '@angular/core';
import { UserModel } from './models/User.model';
import {Http, Headers} from "@angular/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class LoginService {
    constructor(private http: Http) { }
    // api calls go here
    getUser(): Observable<UserModel[]> {
        //this.headers.
        return this.http.post('http://localhost:5000/connect/token',{})
            .map(x => x.json()); // creates the  "payload" on the next line
        //.map(payload => ({type: 'ADD_TICKET_LIST', payload: payload})) // creates the "action"
        //.subscribe(action => this._store.dispatch(action)); // dispatches the action
    }

   
}