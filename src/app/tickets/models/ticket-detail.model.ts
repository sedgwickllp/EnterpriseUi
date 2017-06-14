export interface TicketDetailModel{
    ticketId?: number;
    category?: string;
    subCategory?: string;
    origin?: string;    
    status?: string;
    priority?: string;
    cause?: string;
    createdDateTime?: string;
    summary?: string;
    isDeleted?: boolean;
    isConfidential?: boolean;

}