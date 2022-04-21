import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowIncomesPage } from './show-incomes.page';

const routes: Routes = [
  {
    path: '',
    component: ShowIncomesPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowIncomesPageRoutingModule {}
