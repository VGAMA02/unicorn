import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditScheduledPageRoutingModule } from './edit-scheduled-routing.module';
import { EditScheduledPage } from './edit-scheduled.page';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; //parece que este modulo es importante para que el service funcione
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditScheduledPageRoutingModule,
    HttpClientModule,
    RouterModule,
  ],
  declarations: [EditScheduledPage]
})
export class EditScheduledPageModule {}
