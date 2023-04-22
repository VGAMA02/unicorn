import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children:[
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'income',
        loadChildren: () => import('../income/income.module').then( m => m.IncomePageModule)
      },
      {
        path: 'outflow',
        loadChildren: () => import('../outflow/outflow.module').then( m => m.OutflowPageModule)
      },
      {
        path: 'analisis-inc-out-sch',
        loadChildren: () => import('../analisis-inc-out-sch/analisis-inc-out-sch.module').then( m => m.AnalisisIncOutSchPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
