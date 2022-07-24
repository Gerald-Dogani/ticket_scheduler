import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DetailsComponent } from './details/details.component';
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    TicketRoutingModule,
    SharedModule
  ],
  providers: [
    DatePipe
  ]

})
export class TicketModule { }
