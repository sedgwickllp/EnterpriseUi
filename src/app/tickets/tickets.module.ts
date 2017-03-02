import { TicketService } from './ticket.service';
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TicketEdit } from './ticket-edit/ticket-edit.component';


export const routes = [
  { path: '', redirectTo: 'ticket-edit', pathMatch: 'full' },
  {path: 'ticket-edit', component: TicketEdit}
];


@NgModule({
  imports: [
   CommonModule,
   FormsModule,
   RouterModule.forChild(routes)
   ],
  declarations: [ TicketEdit ],
  providers: [ TicketService ]
})
export class TicketsModule {
  static routes = routes;
}
