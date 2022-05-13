import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OutflowPageRoutingModule } from './outflow-routing.module';
import { OutflowPage } from './outflow.page';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; //parece que este modulo es importante para que el service funcione
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutflowPageRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  declarations: [OutflowPage]
})
export class OutflowPageModule {}
