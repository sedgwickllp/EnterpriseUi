import { TicketService } from '../ticket.service';
import { TicketModel } from '../models/ticket.model';
import { Component, OnInit } from '@angular/core';
import * as types from '../models/types.model';
import { TypeCode } from '../models/type-code';


@Component({
  selector: 'ticket-detail',
  templateUrl: './ticket-detail.component.html'
})
export class TicketDetail implements OnInit {
    ticket: TicketModel;
    submitted: boolean;
    statusTypes: TypeCode[];

    constructor(private ticketService: TicketService) { console.log(this.ticketService); }

    ngOnInit() {
      this.ticket = this.ticketService.getTicketById(1);
      console.log(this.ticket);
      this.statusTypes = this.getStatusTypeList();
      console.log(this.statusTypes);
    }

getStatusTypeList(){
  return types.statusType;
}
    save()
      {
        this.submitted = true;
        console.log(this.ticket);
        alert('Ticket was updated!');
      }
}
