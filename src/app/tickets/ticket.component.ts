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
import { TicketProgressModel } from 'app/tickets/models/ticket-progress.model';

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
    ticketProgress$: Observable<TicketProgressModel>;
    ticketId: number = 1;

    constructor(private store: Store<ApplicationState>,
        private ticketActions: TicketActions, private typecodesActions: TypecodesActions) {

        this.ticketComments$ = store.select(this.ticketCommentsSelector);
        this.ticketActivity$ = store.select(this.ticketActivitySelector);
        this.ticketRequester$ = store.select(this.ticketRequesterSelector);
        this.ticketDetail$ = store.select(this.ticketDetailSelector);
        this.ticketProgress$ = store.select(this.ticketProgressSelector);
        this.typecodes$ = store.select(this.typecodesSelector);
    }

    ngOnInit() {
        this.store.dispatch(this.ticketActions.getTicketById(this.ticketId));
        this.store.dispatch(this.typecodesActions.getAllTypecodes());

    }

    typecodesSelector(state: ApplicationState): AllTypeCodesModel {
        if (state.typecodesStoreData) {
            return {
                categoryTypes: state.typecodesStoreData.categories,
                priorityTypes: state.typecodesStoreData.priorities,
                originTypes: state.typecodesStoreData.origins,
                causeTypes: state.typecodesStoreData.causes,
                statusTypes: state.typecodesStoreData.statuses,
                subcategoryTypes: state.typecodesStoreData.subcategories
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

    ticketProgressSelector(state: ApplicationState): TicketProgressModel {
        if (state.ticketStoreData) {
            return state.ticketStoreData.ticketProgress;
        }
        return {};
    }

    onPostComment(newComment: TicketCommentsModel) {

        this.store.dispatch(this.ticketActions.postComment({ ticketId: this.ticketId, comment: newComment.Comment, isVisible: newComment.IsVisible }))
    }
}
