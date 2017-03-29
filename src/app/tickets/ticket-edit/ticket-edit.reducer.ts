import { Action } from '@ngrx/store';
import { TicketModel } from '../models/ticket.model';
// import { ADD_TICKET, LOAD_TICKET } from './ticket-edit.actions';
import { LOAD_TICKET } from './ticket-edit.actions';

export interface State {
  loaded: boolean;
  loading: boolean;
  ticket: TicketModel;
};

const initialState: State = {
  loaded: false,
  loading: false,
  ticket: {requestorName: '', ticketId: 0}
};

export function ticketEditReducer(state = initialState, action: Action): State {
    switch (action.type) {
        case LOAD_TICKET:
            return Object.assign({}, state, {
                loading: true
            });
            default:
            return state;
        }
    }
