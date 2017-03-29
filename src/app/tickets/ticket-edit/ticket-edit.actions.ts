import { Action } from '@ngrx/store';
import { TicketModel } from '../models/ticket.model';

export const ADD_TICKET = 'ADD_TICKET';
export const LOAD_TICKET = 'LOAD_TICKET';
// export const ActionTypes = {
//     ADD_TICKET: 'ADD_TICKET',
//     LOAD: 'LOAD'
// };

// export class AddTicketAction implements Action {
//     type = ActionTypes.ADD_TICKET;
//     constructor(public payload: TicketModel) {}
// }

// export class LoadTicketAction implements Action {
//     type = ActionTypes.LOAD;
//     constructor(public payload: TicketModel[] ) { }
// }

// export type Actions
// = AddTicketAction
// | LoadTicketAction;
