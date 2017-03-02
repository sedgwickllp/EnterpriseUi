import { Injectable } from '@angular/core';
import { TicketModel } from './models/ticket.model';
@Injectable()
export class TicketService {
// api calls go here
getTicketById(id: number): TicketModel {
    return {requestorName: 'Danielle', ticketId: 1};
}
}
