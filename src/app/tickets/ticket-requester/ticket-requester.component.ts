import { Component, OnInit } from '@angular/core';
import { TicketModel } from '../models/ticket.model';
import { TicketService } from '../ticket.service';
import { TicketRequesterModel } from "app/tickets/models/ticket-requester.model";

@Component({
    selector: 'ticket-requester',
    templateUrl: './ticket-requester.component.html',
    styleUrls: ['ticket-requester.style.scss']
})

export class TicketRequester implements OnInit {
    // ticket: TicketModel;
    requester: TicketRequesterModel;

    constructor(private ticketService: TicketService) { }

    ngOnInit() {
        this.requester = {
            firstName: 'Tina',
            lastName: 'Sanders',
            email: 'tina.sanders@sedgwicklaw.com',
            phone: '111.111.1111',
            location: 'Kansas City'
        };
    }
}
