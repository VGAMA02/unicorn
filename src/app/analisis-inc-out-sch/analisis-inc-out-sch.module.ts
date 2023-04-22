import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AnalisisIncOutSchPageRoutingModule } from './analisis-inc-out-sch-routing.module';
import { AnalisisIncOutSchPage } from './analisis-inc-out-sch.page';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; //parece que este modulo es importante para que el service funcione
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnalisisIncOutSchPageRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  declarations: [AnalisisIncOutSchPage]
})
export class AnalisisIncOutSchPageModule {}
