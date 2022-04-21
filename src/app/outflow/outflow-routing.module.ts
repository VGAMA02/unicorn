import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutflowPage } from './outflow.page';

const routes: Routes = [
  {
    path: '',
    component: OutflowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutflowPageRoutingModule {}
