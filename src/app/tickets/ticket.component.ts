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
    ticketId: number = 5;

constructor(private store: Store<ApplicationState>,
private ticketActions: TicketActions) { 

    this.ticketComments$ = store.select(this.ticketCommentsSelector);
    this.ticketActivity$ = store.select(this.ticketActivitySelector);
    this.ticketRequester$ = store.select(this.ticketRequesterSelector);
        
}

    ngOnInit() {
        this.store.dispatch(this.ticketActions.getTicketById(this.ticketId));
      
}
 ticketCommentsSelector(state: ApplicationState):TicketCommentsModel[] {
     if(state.ticketStoreData) {
        return state.ticketStoreData.ticketComments;
     }
    return [];
}

ticketActivitySelector(state: ApplicationState): TicketActivityModel[] {
    if(state.ticketStoreData) {
        return state.ticketStoreData.ticketActivity;
    }
    return [];
}

ticketRequesterSelector(state: ApplicationState): TicketRequesterModel {
    if(state.ticketStoreData) {
        return state.ticketStoreData.ticketRequester;
    }
    return {};
}

onPostComment(newComment: string){

    this.store.dispatch(this.ticketActions.postComment({ ticketId: this.ticketId, comment: newComment}))
}
}
