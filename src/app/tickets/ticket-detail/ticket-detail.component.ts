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
    submitted: boolean;

   constructor(private typecodeService: TypecodesService) {  }

    ngOnInit() {
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
        let test = this.typecodes;
        this.submitted = true;
        console.log(this.ticket);
        alert('Ticket was updated!');
      }
}
