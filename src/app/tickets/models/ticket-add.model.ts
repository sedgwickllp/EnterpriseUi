export interface TicketAddModel{
    summary?: string;
    requesterId?: int;
    ownerId?: int;
    causeId?: int;
    statusId?: TypeCode;
    priorityId?: TypeCode;
    originId?: int;
    categoryId?: TypeCode;
    subcategoryId?: TypeCode;
    isConfidential?: bool;
}