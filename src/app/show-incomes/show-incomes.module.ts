import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ShowIncomesPageRoutingModule } from './show-incomes-routing.module';
import { ShowIncomesPage } from './show-incomes.page';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowIncomesPageRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  declarations: [ShowIncomesPage]
})
export class ShowIncomesPageModule {}
