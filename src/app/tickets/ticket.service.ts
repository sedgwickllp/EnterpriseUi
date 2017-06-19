import { Injectable } from '@angular/core';
import { TicketModel, TicketTestModel } from './models/ticket.model';
import {Http, Headers} from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { TicketStoreData } from './ticket-store/ticket.store-data';
import { TicketCommentsRequest } from "app/tickets/models/ticket-comments.model";
import { TicketDetailModel } from './models/ticket-detail.model';
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
    return this.http.post('http://localhost:58707/api/ticketComments', comment)
    .map(res => res.json());
}

putTicket(ticket: TicketDetailModel){
    return this.http.put('http://localhost:58707/api/tickets/' + ticket.TicketId, ticket)
    .map(res => res.json());

}
}
