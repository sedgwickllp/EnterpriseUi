import { TypeCode } from './type-code';

export interface TicketAddModel{
    summary?: string;
    requesterId?: number;
    ownerId?: number;
    causeId?: number;
    statusId?: number;
    priorityId?: number;
    originId?: number;
    categoryId?: number;
    subcategoryId?: number;
    isConfidential?: boolean;
}