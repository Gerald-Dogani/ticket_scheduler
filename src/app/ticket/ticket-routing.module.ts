import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from "./list/list.component";
import {FormComponent} from "./form/form.component";
import {DetailsComponent} from "./details/details.component";

const routes: Routes = [
  {path: 'list', component: ListComponent},
  {path: 'form', component: FormComponent},
  {path: 'details', component: DetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule {
}
