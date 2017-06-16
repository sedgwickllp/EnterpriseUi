export interface TicketCommentsModel {
    UserName: string;
    CreatedDateTime?: string;
    Comment: string;
    IsVisible: boolean;
    TicketId?: number;

}

export interface TicketCommentsRequest {
    id?: number;
    ticketId: number;
    // userName: string;
    // createdDateTime: string;
    comment: string;
    
}
