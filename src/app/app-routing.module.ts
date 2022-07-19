import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent, NavigationComponent} from "@core/components";
import {AuthGuard} from "@core/guards/auth.guard";

const routes: Routes = [
  // {path : '' ,  loadChildren: () => import('./core/core.module').then(m => m.CoreModule)},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: '-', component: NavigationComponent, children:[
      {path : 'dashboard' , component: DashboardComponent},
      {path: '', loadChildren: () => import('./ticket/ticket.module').then(m => m.TicketModule)},
    ],
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'auth/login', pathMatch: 'full' },
]


@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false, useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
