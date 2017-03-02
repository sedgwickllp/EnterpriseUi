import { TicketService } from '../ticket.service';
import { TicketModel } from '../models/ticket.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[ticket-edit]',
  templateUrl: './ticket-edit.component.html'
})
export class TicketEdit implements OnInit {
    ticket: TicketModel;
    submitted: boolean;

    constructor(private ticketService: TicketService) { console.log(this.ticketService); }

    ngOnInit() {
      this.ticket = this.ticketService.getTicketById(1);

    }

    save()
      {
        this.submitted = true;
        console.log(this.ticket);
        alert('Ticket was updated!');
      }
}
