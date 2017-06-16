import { TicketStoreData } from './ticket.store-data';
import { Action } from '@ngrx/store';
import { TicketActions } from './ticket-actions';
import { TicketCommentsModel } from '../models/ticket-comments.model';
import * as moment from 'moment';
export function ticketStoreData(state: TicketStoreData, action: Action): TicketStoreData {
    switch (action.type) {
        case TicketActions.GET_TICKET_SUCCESS:
            return {
                ticketDetail: action.payload.TicketDetail,
                ticketRequester: action.payload.TicketRequester,
                ticketActivity: action.payload.TicketActivity,
                ticketComments: action.payload.TicketComments,
                ticketProgress: action.payload.TicketProgress
            }
        case TicketActions.POST_COMMENT:
            return handleNewCommentReceivedAction(state, <any>action);
        default:
            return state;
    }
}

function handleNewCommentReceivedAction(state: TicketStoreData, action: Action) {
    const newStoreData: TicketStoreData = {
        ticketDetail: state.ticketDetail,
        ticketRequester: state.ticketRequester,
        ticketActivity: state.ticketActivity,
        ticketComments: state.ticketComments,
        ticketProgress: state.ticketProgress
    };

    const newComment: TicketCommentsModel = {
        UserName: "user",
        CreatedDateTime: moment().format('MM/DD/YY'),
        Comment: action.payload.comment,
        IsVisible: action.payload.isVisible,
        TicketId: action.payload.ticketId
    };
    newStoreData.ticketComments.push(newComment);
    return newStoreData;
}