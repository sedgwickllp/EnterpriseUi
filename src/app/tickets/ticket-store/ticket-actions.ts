import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class TicketActions {
    static GET_TICKET_BY_ID = '[Ticket] Get Ticket By Id'
    static GET_TICKET_SUCCESS = '[Ticket] Get Ticket Success';
    static POST_COMMENT = '[Ticket] Post Comment';
    
   getTicketById(id): Action {
       return {
           type: TicketActions.GET_TICKET_BY_ID,
           payload: id
       };
   }
    getTicket(ticket): Action {
        return {
            type: TicketActions.GET_TICKET_SUCCESS,
            payload: ticket
        };
    }

    postComment(newComment): Action {
        return {
            type: TicketActions.POST_COMMENT,
            payload: newComment
        }
    }
}