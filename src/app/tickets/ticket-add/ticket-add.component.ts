import { TicketService } from '../ticket.service';
import { TicketModel, TicketTestModel } from '../models/ticket.model';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import * as types from '../models/types.model';
import { TypeCode } from '../models/type-code';
import { TicketAddModel } from '../models/ticket-add.model';
import { TypecodesService } from "app/core/typecodes/typecodes.service";
import { AllTypeCodesModel } from "app/core/typecodes/typecode.model";


@Component({
  selector: 'ticket-add',
  templateUrl: './ticket-add.component.html'
})
export class TicketAdd implements OnInit {
    //@Input()
    
    @Input()
    typecodes: AllTypeCodesModel;
   test = [{text:'hardware', children: ['computer','monitor','mouse','keyboard']}, {text:'software', children:['email', 'intranet', 'office', 'finance', 'filesite']}];
    submitted: boolean;
    @Output()
    newTicket: TicketAddModel;
    postTicket = new EventEmitter();
    //subComponent = 'email';

   constructor(private typecodeService: TypecodesService) {  }

    ngOnInit() {
      console.log("newTicket",this.newTicket);
      this.newTicket = {
        summary: "",
        requesterId: null,
        ownerId: null,
        causeId: null,
        statusId: null,
        priorityId: null,
        originId: null,
        categoryId: null,
        subcategoryId: null,
        isConfidential: false
      }
    }
     // this.newTicket.isConfidential = false;
      //console.log(this.ticket.subComponent);
     postTicket(ticket)
      {
        this.postTicket.next(newTicket);
        this.newTicket = "";
      }
}
