import { Injectable } from '@angular/core';
import { TicketModel, TicketTestModel } from './models/ticket.model';
import {Http, Headers} from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { TicketStoreData } from './ticket-store/ticket.store-data';
import { TicketCommentsRequest } from "app/tickets/models/ticket-comments.model";
@Injectable()
export class TicketService {
    constructor(private http: Http) { }
// api calls go here
getTickets(): Observable<TicketModel[]> {
   return this.http.get('http://localhost:58707/api/tickets')
    .map(x => x.json()); // creates the  "payload" on the next line
    //.map(payload => ({type: 'ADD_TICKET_LIST', payload: payload})) // creates the "action"
    //.subscribe(action => this._store.dispatch(action)); // dispatches the action
}

getTicketDetailById(id: number): Observable<TicketModel> {
    return this.http.get('http://localhost:58707/api/tickets/' + id)
    .map(res => res.json());
}

postTicketComment(comment: TicketCommentsRequest){
    return this.http.post('http://localhost:58707/api/ticketNote', comment)
    .map(res => res.json());
}
getTicketById(id: number): TicketTestModel {
    return {
        requestorName: 'Danielle',
        ticketId: 1,
        component: {id: 1, text: 'Software'},
        subcomponent: {id: 1, text: 'Outlook'},
        category: {id: 1, text: 'Password Reset' },
        priority: {id: 1, text: 'High' },
        status: {id: 2, text: 'Open' },
        description: 'say need to set password but do not know old one',
        createdDate: '03/17/2017',
        updatedDate: '',
        source: {id: 1, text: 'email'}
    };
}
}
