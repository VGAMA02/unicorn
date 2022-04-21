import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ScheduledPageRoutingModule } from './scheduled-routing.module';
import { ScheduledPage } from './scheduled.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScheduledPageRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ],
  declarations: [ScheduledPage]
})
export class ScheduledPageModule {}
