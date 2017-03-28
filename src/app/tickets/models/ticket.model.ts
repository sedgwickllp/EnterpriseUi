import { TypeCode } from './type-code';
export interface TicketModel {
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
