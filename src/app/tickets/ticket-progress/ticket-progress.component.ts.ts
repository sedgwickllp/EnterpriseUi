import { Component, Input } from '@angular/core';
import { TicketProgressModel } from "app/tickets/models/ticket-progress.model";

@Component({
  selector: 'ticket-progress',
  templateUrl: './ticket-progress.component.html',
  styleUrls: ['ticket-progress.style.scss']
})


export class TicketProgress {
    @Input()
    ticket: TicketProgressModel;
}