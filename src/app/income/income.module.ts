import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IncomePageRoutingModule } from './income-routing.module';
import { IncomePage } from './income.page';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; //parece que este modulo es importante para que el service funcione
import { NgxEchartsModule } from 'ngx-echarts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncomePageRoutingModule,
    RouterModule,
    HttpClientModule,
    Ng2GoogleChartsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),

    
  ],
  declarations: [IncomePage]
})
export class IncomePageModule {}
