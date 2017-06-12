import { ApplicationState } from '../application.state';
import { TypecodesActions } from '../core/typecodes/typecodes-actions';
import { TicketCommentsModel } from './models/ticket-comments.model';
import { TicketDetailModel } from './models/ticket-detail.model';
import { TicketRequesterModel } from './models/ticket-requester.model';
import { TicketActions } from './ticket-store/ticket-actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AllTypeCodesModel } from 'app/core/typecodes/typecode.model';
import { TicketActivityModel } from 'app/tickets/models/ticket-activity.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'ticket',
    templateUrl: './ticket.component.html'
})

export class Ticket implements OnInit {
    ticketDetail$: Observable<TicketDetailModel>;
    typecodes$: Observable<AllTypeCodesModel>;
    ticketRequester$: Observable<TicketRequesterModel>;
    ticketActivity$: Observable<TicketActivityModel[]>;
    ticketComments$: Observable<TicketCommentsModel[]>;
    ticketId: number = 5;

    constructor(private store: Store<ApplicationState>,
        private ticketActions: TicketActions, private typecodesActions: TypecodesActions) {

        this.ticketComments$ = store.select(this.ticketCommentsSelector);
        this.ticketActivity$ = store.select(this.ticketActivitySelector);
        this.ticketRequester$ = store.select(this.ticketRequesterSelector);
        this.ticketDetail$ = store.select(this.ticketDetailSelector);
        this.typecodes$ = store.select(this.typecodesSelector);
    }

    ngOnInit() {
        this.store.dispatch(this.ticketActions.getTicketById(this.ticketId));
        this.store.dispatch(this.typecodesActions.getAllTypecodes());

    }

    typecodesSelector(state: ApplicationState): AllTypeCodesModel {
        if (state.typecodesStoreData) {
            return {
                itComponentTypes: state.typecodesStoreData.components,
                priorityTypes: state.typecodesStoreData.priorities,
                requestTypes: state.typecodesStoreData.requests,
                sourceTypes: state.typecodesStoreData.sources,
                statusTypes: state.typecodesStoreData.statuses,
                subcomponentTypes: state.typecodesStoreData.subComponents
            };
        }
    }

    ticketCommentsSelector(state: ApplicationState): TicketCommentsModel[] {
        if (state.ticketStoreData) {
            return state.ticketStoreData.ticketComments;
        }
        return [];
    }
    ticketDetailSelector(state: ApplicationState): TicketDetailModel {
        if (state.ticketStoreData) {
            return state.ticketStoreData.ticketDetail;
        }
        return {};
    }

    ticketActivitySelector(state: ApplicationState): TicketActivityModel[] {
        if (state.ticketStoreData) {
            return state.ticketStoreData.ticketActivity;
        }
        return [];
    }

    ticketRequesterSelector(state: ApplicationState): TicketRequesterModel {
        if (state.ticketStoreData) {
            return state.ticketStoreData.ticketRequester;
        }
        return {};
    }

    onPostComment(newComment: string) {

        this.store.dispatch(this.ticketActions.postComment({ ticketId: this.ticketId, comment: newComment }))
    }
}
