import { Component, OnInit } from '@angular/core';
import { TicketCommentsModel } from '../models/ticket-comments.model';

@Component({
    selector: 'ticket-comments',
    templateUrl: './ticket-comments.component.html'
})

export class TicketComments implements OnInit {
    comments: TicketCommentsModel[];

    ngOnInit() {
        this.comments = [
            { userName: 'Tina Sanders',
                createdDateTime: 'February 22, 2014 at 01:59 PM', 
                comment: 'comment for the comments'},
               { userName: 'John Doe',
                createdDateTime: 'March 14, 2017 at 10:22 PM', 
                comment: 'another comment for the comments'}
                ];
    }
}
