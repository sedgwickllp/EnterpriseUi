import { Injectable } from '@angular/core';
import { TicketModel, TicketTestModel } from './models/ticket.model';
import {Http, Headers} from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { TicketStoreData } from './ticket-store/ticket.store-data';
import { TicketCommentsRequest } from "app/tickets/models/ticket-comments.model";
import { TicketAddModel } from "app/tickets/models/ticket-add.model";
import { TicketDetailModel } from './models/ticket-detail.model';

@Injectable()
export class TicketService {
    constructor(private http: Http) { }
    private apiServer = (process.env.ENV == 'development') ? 'http://localhost:58707' : 'http://10.31.201.176:60497';
// api calls go here
getTickets(): Observable<TicketModel[]> {
   return this.http.get(this.apiServer + '/api/tickets')
    .map(x => x.json()); // creates the  "payload" on the next line
    //.map(payload => ({type: 'ADD_TICKET_LIST', payload: payload})) // creates the "action"
    //.subscribe(action => this._store.dispatch(action)); // dispatches the action
}

getTicketDetailById(id: number): Observable<TicketModel> {
    return this.http.get(this.apiServer + '/api/tickets/' + id)
    .map(res => res.json());
}

postTicketComment(comment: TicketCommentsRequest){
    return this.http.post(this.apiServer + '/api/ticketComments', comment)
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
addTicket(ticket: TicketAddModel){
    return this.http.post(this.apiServer + '/api/tickets', ticket)
    .map(res => res.json());
}
putTicket(ticket: TicketDetailModel){
    return this.http.put(this.apiServer + '/api/tickets/' + ticket.TicketId, ticket)
    .map(res => res.json());

}


}
