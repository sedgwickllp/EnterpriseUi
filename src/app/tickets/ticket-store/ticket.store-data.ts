import { TicketCommentsModel } from '../models/ticket-comments.model';
import { TicketRequesterModel } from '../models/ticket-requester.model';
import { TicketDetailModel } from '../models/ticket-detail.model';
import { TicketModel } from '../models/ticket.model';
import { TicketActivityModel } from '../models/ticket-activity.model';
import { TicketRequester } from '../ticket-requester/ticket-requester.component';
import { TicketProgressModel } from 'app/tickets/models/ticket-progress.model';
import { TicketAddModel } from 'app/tickets/models/ticket-add.model';
export interface TicketStoreData {
    ticketDetail: TicketDetailModel;
    ticketRequester: TicketRequesterModel;
    ticketActivity: TicketActivityModel[];
    ticketComments: TicketCommentsModel[];
    ticketProgress: TicketProgressModel;
}

export const INITIAL_TICKET_STORE_DATA: TicketStoreData = {
    ticketDetail: {},
    ticketRequester: {},
    ticketActivity: [],
    ticketComments: [],
    ticketProgress: {}
};