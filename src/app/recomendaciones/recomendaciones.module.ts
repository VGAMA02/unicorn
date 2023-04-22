import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RecomendacionesPageRoutingModule } from './recomendaciones-routing.module';
import { RecomendacionesPage } from './recomendaciones.page';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; //parece que este modulo es importante para que el service funcione
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecomendacionesPageRoutingModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [RecomendacionesPage]
})
export class RecomendacionesPageModule {}
