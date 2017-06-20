import { Routes, RouterModule }  from '@angular/router';
import { Layout } from './layout.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  { path: '', component: Layout, children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardModule' },
    { path: 'tickets', loadChildren: '../tickets/tickets.module#TicketsModule' },
    { path: 'login', loadChildren: '../login/login.module#LoginModule'}
  ]}
];

export const ROUTES = RouterModule.forChild(routes);
