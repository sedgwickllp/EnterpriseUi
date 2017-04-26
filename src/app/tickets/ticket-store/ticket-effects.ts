import { TicketService } from '../ticket.service';
import { Injectable } from '@angular/core';
import { Effect, Actions } from "@ngrx/effects";
import { TicketActions } from './ticket-actions';
import { Observable } from 'rxjs/Rx';
import { Action } from '@ngrx/store';

@Injectable()
export class TicketEffects {
    constructor(private actions$: Actions,
    private ticketService: TicketService,
    private ticketActions: TicketActions) {
        
    }

    @Effect() getTicket$: Observable<Action> = this.actions$
        .ofType(TicketActions.GET_TICKET_BY_ID)
        .switchMap(() => this.ticketService.getTicketDetailById(5))
        .map(ticket => this.ticketActions.getTicket(ticket));
}