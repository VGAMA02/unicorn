import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditScheduledPage } from './edit-scheduled.page';

const routes: Routes = [
  {
    path: '',
    component: EditScheduledPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditScheduledPageRoutingModule {}
