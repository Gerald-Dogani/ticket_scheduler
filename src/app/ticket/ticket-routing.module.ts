import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from "./list/list.component";
import {FormComponent} from "./form/form.component";
import {DetailsComponent} from "./details/details.component";
import {DatePipe} from "@shared/pipes/date.pipe";

const routes: Routes = [
  {path: 'list', component: ListComponent, pathMatch: 'full'},
  {path: 'form', component: FormComponent, pathMatch: 'full'},
  {path: 'details', component: DetailsComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [DatePipe],
  exports: [RouterModule, DatePipe]
})
export class TicketRoutingModule {
}
