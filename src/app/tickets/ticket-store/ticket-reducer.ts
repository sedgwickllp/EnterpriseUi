import { TicketStoreData } from './ticket.store-data';
import { Action } from '@ngrx/store';
import { TicketActions } from './ticket-actions';
import { TicketCommentsModel } from '../models/ticket-comments.model';
import * as moment from 'moment';
export function ticketStoreData(state: TicketStoreData, action: Action): TicketStoreData {
    switch (action.type) {
        case TicketActions.GET_TICKET_SUCCESS:
            return {
                ticketDetail: action.payload.ticketDetail,
                ticketRequester: action.payload.ticketRequester,
                ticketActivity: action.payload.ticketActivity,
                ticketComments: action.payload.ticketComments
            }
        case TicketActions.POST_COMMENT:
            return handleNewCommentReceivedAction(state, <any>action);
        case TicketActions.ADD_TICKET:
            return handleNewTicketReceivedAction(state, <any>action);
        default:
            return state;
    }
}

function handleNewCommentReceivedAction(state: TicketStoreData, action: Action) {
    const newStoreData: TicketStoreData = {
        ticketDetail: state.ticketDetail,
        ticketRequester: state.ticketRequester,
        ticketActivity: state.ticketActivity,
        ticketComments: state.ticketComments
    };

    const newComment: TicketCommentsModel = {
        userName: "Princess Leia",
        //createdDateTime: moment().format('MM/DD/YY'),
        comment: action.payload.comment,
        isVisible: action.payload.isVisible
    };
    newStoreData.ticketComments.push(newComment);
    return newStoreData;
}

function handleNewTicketReceivedAction(state: TicketStoreData, action: Action) {
    const newStoreData: TicketStoreData = {
        ticketDetail: state.ticketDetail,
        ticketRequester: state.ticketRequester,
        ticketActivity: state.ticketActivity,
        ticketComments: state.ticketComments
    };

    const newComment: TicketCommentsModel = {
        userName: "Princess Leia",
        //createdDateTime: moment().format('MM/DD/YY'),
        comment: action.payload.comment,
        isVisible: action.payload.isVisible
    };
    newStoreData.ticketComments.push(newComment);
    return newStoreData;
}