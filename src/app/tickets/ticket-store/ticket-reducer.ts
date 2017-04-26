import { TicketStoreData } from './ticket.store-data';
import { Action } from '@ngrx/store';
import { TicketActions } from './ticket-actions';

export function ticketStoreData(state: TicketStoreData, action: Action): TicketStoreData {
    switch (action.type) {
        case TicketActions.GET_TICKET_SUCCESS:
            return {
                ticketDetail: action.payload.ticketDetail,
                ticketRequester: action.payload.ticketRequester,
                ticketActivity: action.payload.ticketActivity,
                ticketComments: action.payload.ticketComments
            }
        default:
            return state;
    }
}