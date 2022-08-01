import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DetailsComponent } from './details/details.component';
import {SharedModule} from "@shared/shared.module";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {NgChartsModule} from "ng2-charts";


@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    DetailsComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    TicketRoutingModule,
    SharedModule,
    NgChartsModule
  ],
  providers: [
    DatePipe
  ]

})
export class TicketModule { }
