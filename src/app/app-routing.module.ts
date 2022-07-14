import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavigationComponent} from "./shared/navigation/navigation.component";

const routes: Routes = [
  {path: '', component: NavigationComponent, children:[
      // {path : '' ,  loadChildren: () => import('./agent/agent.module').then(m => m.AgentModule)},
    ],
  },
  {path: '**', redirectTo: '', pathMatch: 'full'},
]


@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false, useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
