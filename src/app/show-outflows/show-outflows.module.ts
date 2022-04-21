import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ShowOutflowsPageRoutingModule } from './show-outflows-routing.module';
import { ShowOutflowsPage } from './show-outflows.page';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowOutflowsPageRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  declarations: [ShowOutflowsPage]
})
export class ShowOutflowsPageModule {}
