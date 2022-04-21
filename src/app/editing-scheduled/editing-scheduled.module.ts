import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { EditingScheduledPageRoutingModule } from './editing-scheduled-routing.module';
import { EditingScheduledPage } from './editing-scheduled.page';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; //parece que este modulo es importante para que el service funcione
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditingScheduledPageRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  declarations: [EditingScheduledPage]
})
export class EditingScheduledPageModule {}
