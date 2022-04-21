import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditingScheduledPage } from './editing-scheduled.page';

const routes: Routes = [
  {
    path: '',
    component: EditingScheduledPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditingScheduledPageRoutingModule {}
