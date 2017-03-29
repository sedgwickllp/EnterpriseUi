import { TicketService } from '../ticket.service';
import { TicketModel } from '../models/ticket.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { LOAD_TICKET } from './ticket-edit.actions';


@Component({
  selector: '[ticket-edit]',
  templateUrl: './ticket-edit.component.html'
})
export class TicketEdit implements OnInit {
    ticketState$: Observable<TicketModel>;
    ticket: TicketModel;
    submitted: boolean;
    private ticketStateSubscription: Subscription;

    constructor(private ticketService: TicketService, private store: Store<TicketModel>) { 
      console.log(this.ticketService);
      this.ticketState$ = store.select('ticketModel');
    }

    ngOnInit() {
      this.ticketStateSubscription = this.ticketState$.subscribe((state) => {
        this.ticket = state;
      });
      // this.ticket = this.ticketService.getTicketById(1);
    }

    ngOnDestroy() {
      this.ticketStateSubscription.unsubscribe();
    }

    addTicketHandler(ticket: TicketModel) {
      this.store.dispatch({
        type: LOAD_TICKET,
        payload: ticket
      });
    }
    save(ticket: TicketModel)
      {
        this.submitted = true;
        this.addTicketHandler(ticket);
        console.log(this.ticket);
        alert('Ticket was updated!');
      }
}
