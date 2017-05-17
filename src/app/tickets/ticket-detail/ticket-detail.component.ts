import { TicketService } from '../ticket.service';
import { TicketModel, TicketTestModel } from '../models/ticket.model';
import { Component, Input, OnInit } from '@angular/core';
import * as types from '../models/types.model';
import { TypeCode } from '../models/type-code';
import { TicketDetailModel } from '../models/ticket-detail.model';
import { TypecodesService } from "app/core/typecodes/typecodes.service";
import { AllTypeCodesModel } from "app/core/typecodes/typecode.model";


@Component({
  selector: 'ticket-detail',
  templateUrl: './ticket-detail.component.html'
})
export class TicketDetail implements OnInit {
    @Input()
    ticket: TicketDetailModel;
    @Input()
    typecodes: AllTypeCodesModel;
   test = [{text:'hardware', children: ['computer','monitor','mouse','keyboard']}, {text:'software', children:['email', 'intranet', 'office', 'finance', 'filesite']}];
    submitted: boolean;
    // statusTypes: TypeCode[];
    // status = ['Open', 'In Progress', 'Closed'];
    subComponent = 'email';

   constructor(private typecodeService: TypecodesService) {  }

    ngOnInit() {
      this.ticket.subComponent = 'email';
      console.log(this.ticket.subComponent);
      // this.typecodeService.getTypecodes()
      // .map(x => this.test = x)
      // .subscribe(value => console.log(value));
      //console.log(this.test);
      // this.statusTypes = this.getStatusTypeList();
      // console.log(this.statusTypes);
    }

// getStatusTypeList(){
//   return types.statusType;
// }
    save()
      {
        this.submitted = true;
        console.log(this.ticket);
        alert('Ticket was updated!');
      }
}
