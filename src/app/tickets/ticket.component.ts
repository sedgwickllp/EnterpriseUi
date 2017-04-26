import { TicketCommentsModel } from './models/ticket-comments.model';
import { TicketActions } from './ticket-store/ticket-actions';
import { Store } from '@ngrx/store';
import { TicketModel } from './models/ticket.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ApplicationState } from '../application.state';
import { TicketActivityModel } from 'app/tickets/models/ticket-activity.model';
import { TicketRequesterModel } from './models/ticket-requester.model';
import { TicketDetailModel } from './models/ticket-detail.model';

@Component({
    selector: 'ticket',
    templateUrl: './ticket.component.html'
})

export class Ticket implements OnInit {
    ticketDetail$: Observable<TicketDetailModel>;
    ticketRequester$: Observable<TicketRequesterModel>;
    ticketActivity$: Observable<TicketActivityModel[]>;
    ticketComments$: Observable<TicketCommentsModel[]>;

constructor(private store: Store<ApplicationState>,
private ticketActions: TicketActions) { 

    this.ticketComments$ = store.select(this.ticketCommentsSelector);
        
}

    ngOnInit() {
        this.store.dispatch(this.ticketActions.getTicketById(5));
      
}
 ticketCommentsSelector(state: ApplicationState):TicketCommentsModel[] {
     if(state.ticketStoreData) {
        return state.ticketStoreData.ticketComments;
     }
    return [];
}

onPostComment(newComment: string){
    this.store.dispatch(this.ticketActions.postComment(newComment))
}
}
