import { Component, OnInit } from '@angular/core';
import { TicketActivityModel } from "app/tickets/models/ticket-activity.model";

@Component({
    selector: 'ticket-activity',
    templateUrl: './ticket-activity.component.html',
    styleUrls: ['./ticket-activity.component.scss']
})

export class TicketActivity implements OnInit {
    activityList: TicketActivityModel[];

    ngOnInit() {
        this.activityList = [
            { userName: 'Tina Sanders',
               createdDateTime: 'date',
                activity: 'created ticket'},
                { userName: 'John Doe',
               createdDateTime: 'date',
                activity: 'assigned ticket'}
        ];
    }
}
