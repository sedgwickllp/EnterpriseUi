import { TypeCode } from './type-code';
import { TicketDetailModel } from './ticket-detail.model';
import { TicketActivityModel } from './ticket-activity.model';
import { TicketRequesterModel } from './ticket-requester.model';
import { TicketCommentsModel } from './ticket-comments.model';
export interface TicketModel {
    ticketDetail: TicketDetailModel;
    ticketRequestor: TicketRequesterModel;
    ticketActivity: TicketActivityModel[];
    ticketComments: TicketCommentsModel[];
}
export interface TicketTestModel {
    requestorName: string;
    ticketId: number;
    component: TypeCode;
    subcomponent: TypeCode;
    category: TypeCode;
    priority: TypeCode;
    status: TypeCode;
    description: string;
    createdDate: string;
    updatedDate: string;
    source: TypeCode;
}
