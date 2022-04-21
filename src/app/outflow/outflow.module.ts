import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutflowPageRoutingModule } from './outflow-routing.module';

import { OutflowPage } from './outflow.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutflowPageRoutingModule
  ],
  declarations: [OutflowPage]
})
export class OutflowPageModule {}
