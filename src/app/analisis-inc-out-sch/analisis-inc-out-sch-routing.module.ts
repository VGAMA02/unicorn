import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalisisIncOutSchPage } from './analisis-inc-out-sch.page';

const routes: Routes = [
  {
    path: '',
    component: AnalisisIncOutSchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalisisIncOutSchPageRoutingModule {}
