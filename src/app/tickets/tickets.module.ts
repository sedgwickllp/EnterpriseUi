import { TicketRequester } from './ticket-requester/ticket-requester.component';
import { TicketService } from './ticket.service';
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TicketDetail } from './ticket-detail/ticket-detail.component';
import { Ticket } from './ticket.component';
import { LayoutModule } from '../layout/layout.module';
import { Tab } from '../layout/tabs/tab.component';
import { Tabs } from '../layout/tabs/tabs.component';
import { TicketComments } from './ticket-comments/ticket-comments.component';
import { TicketActivity } from './ticket-activity/ticket-activity.component';

export const routes = [
  { path: '', redirectTo: 'ticket', pathMatch: 'full' },
  { path: 'ticket', component: Ticket },
  {path: 'ticket-detail', component: TicketDetail}
];


@NgModule({
  imports: [
   CommonModule,
   FormsModule,
  //  LayoutModule,
   RouterModule.forChild(routes)
   ],
  declarations: [ TicketDetail,
                  Ticket,
                  TicketComments,
                  TicketActivity,
                  TicketRequester,
                  Tab,
                  Tabs ],
  providers: [ TicketService ]
})
export class TicketsModule {
  static routes = routes;
}
