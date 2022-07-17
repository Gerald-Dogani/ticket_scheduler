import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavigationComponent} from "@core/components";

const routes: Routes = [
  // {path : '' ,  loadChildren: () => import('./core/core.module').then(m => m.CoreModule)},
  {path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: '-', component: NavigationComponent, children:[
      // {path : '' ,  loadChildren: () => import('./agent/agent.module').then(m => m.AgentModule)},
    ],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
]


@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false, useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
