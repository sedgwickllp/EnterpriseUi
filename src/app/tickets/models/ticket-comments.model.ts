export interface TicketCommentsModel {
    userName: string;
    createdDateTime?: string;
    comment: string;
    isVisible: boolean;

}

export interface TicketCommentsRequest {
    id?: number;
    ticketId: number;
    // userName: string;
    // createdDateTime: string;
    comment: string;
    
}
