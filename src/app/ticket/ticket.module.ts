import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    TicketRoutingModule
  ],

})
export class TicketModule { }
