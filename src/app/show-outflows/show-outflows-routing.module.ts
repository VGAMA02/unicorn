import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowOutflowsPage } from './show-outflows.page';

const routes: Routes = [
  {
    path: '',
    component: ShowOutflowsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowOutflowsPageRoutingModule {}
