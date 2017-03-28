import { Injectable } from '@angular/core';
import { TicketModel } from './models/ticket.model';
@Injectable()
export class TicketService {
// api calls go here
getTicketById(id: number): TicketModel {
    return {
        requestorName: 'Danielle',
        ticketId: 1,
        component: {id: 1, text: 'Software'},
        subcomponent: {id: 1, text: 'Outlook'},
        category: {id: 1, text: 'Password Reset' },
        priority: {id: 1, text: 'High' },
        status: {id: 2, text: 'Open' },
        description: 'say need to set password but do not know old one',
        createdDate: '03/17/2017',
        updatedDate: '',
        source: {id: 1, text: 'email'}
    };
}
}
