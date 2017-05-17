import { Component, OnInit, Input } from '@angular/core';
import { TicketActivityModel } from "app/tickets/models/ticket-activity.model";

@Component({
    selector: 'ticket-activity',
    templateUrl: './ticket-activity.component.html',
    styleUrls: ['./ticket-activity.component.scss']
})

export class TicketActivity implements OnInit {
    @Input()
    activity: TicketActivityModel[];
    ngOnInit() {
        
    }
}
