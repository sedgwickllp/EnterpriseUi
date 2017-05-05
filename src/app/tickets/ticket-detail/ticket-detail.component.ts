import { TicketService } from '../ticket.service';
import { TicketModel, TicketTestModel } from '../models/ticket.model';
import { Component, Input, OnInit } from '@angular/core';
import * as types from '../models/types.model';
import { TypeCode } from '../models/type-code';
import { TicketDetailModel } from '../models/ticket-detail.model';


@Component({
  selector: 'ticket-detail',
  templateUrl: './ticket-detail.component.html'
})
export class TicketDetail implements OnInit {
    @Input()
    ticket: TicketDetailModel;
    // ticket: TicketTestModel;
    submitted: boolean;
    statusTypes: TypeCode[];
    status = ['Open', 'In Progress', 'Closed'];

    // constructor(private ticketService: TicketService) { console.log(this.ticketService); }

    ngOnInit() {
      // this.ticket = this.ticketService.getTicketById(1);
      // console.log(this.ticket);
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
