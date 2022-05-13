import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Config } from './config';
import { Alerts } from './alerts';
import { Events } from './events';
import { NgxEchartsModule } from 'ngx-echarts';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,NgxEchartsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },Config,Alerts, Events],
  bootstrap: [AppComponent],
})
export class AppModule {}
