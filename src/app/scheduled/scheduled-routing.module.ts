import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduledPage } from './scheduled.page';

const routes: Routes = [
  {
    path: '',
    component: ScheduledPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduledPageRoutingModule {}
