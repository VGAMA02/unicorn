import { Component, OnInit } from '@angular/core';
import { IncomeService } from './income.service';
import * as Chart from "chart.js"
import { ChangeDetectorRef } from '@angular/core'; 
import { NgxEchartsModule } from 'ngx-echarts';
import { color, EChartsOption } from 'echarts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { DatePipe } from '@angular/common';
import { AlertController }   from '@ionic/angular';
@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
  providers: [IncomeService,NgxEchartsModule,DatePipe],
  
})

export class IncomePage implements OnInit {
  limiter: number = 3;
  averageIncomes: number = 0;
  incomes: Array<any>;
  BiggerIncomes: Array<any>;
  incomesMonth: Array<any>;
  chartIncomes: Chart;
  chartIncomesMonth: Chart;
  ref: ChangeDetectorRef;
  bar: Ng2GoogleChartsModule;
  diasBusqueda: number = 30;
  constructor(private _IncomeService:IncomeService, private datePipe: DatePipe, private alertController: AlertController
    ) { 

    
    }

  ngOnInit() {
      this.getBiggerIncomesInLastMounth();
      this.getIncomesLimiterPage();
      this.AverageIncomes();
  }
  ngAfterContentInit(){
    //this.AverageIncomes();
  }
  ngAfterViewInit(){
    //this.getBiggerIncomesInLastMounth();
    //this.getIncomesLimiterPage();
  }

  ionViewWillEnter(){
    console.log("\n\nActualizando Graficos");
    this.getBiggerIncomesInLastMounth();
    this.AverageIncomes();
    //this.getIncomesLimiterPage();
  }

  generarGraficoBoton(){
    //this.loadColumnChart();
    this.BiggerIncomesInLastMounth_Charts(this.BiggerIncomes);
    this.Incomes_Charts(this.incomesMonth);
  }
  getIncomesLimiterPage(){
    this._IncomeService.getIncomesLimiter(parseInt(localStorage.getItem("idUser")),this.limiter).subscribe((res)=>{
      if(res.status === true){
        console.log(res);
          this.incomes = res.incomes
        console.log("\n----------------------\n");
      } 
    },(error) =>{
      console.log(error);
    }).unsubscribe;
  }


  getBiggerIncomesInLastMounth(){
    this._IncomeService.getBiggerIncomesInLastDaysS(parseInt(localStorage.getItem("idUser")),this.limiter,this.diasBusqueda).subscribe((res)=>{
      if(res.status === true){
        console.log(res);
        this.BiggerIncomes = res.incomes
        console.log("\nBiggerIncomes:"+ this.BiggerIncomes  +  "\n");
        console.log("\n----------------------\n");
        this.BiggerIncomesInLastMounth_Charts(this.BiggerIncomes);
      } 
    },(error) =>{
      console.log(error);
    }).unsubscribe;
    //this.BiggerIncomesInLastMounth_Charts(this.BiggerIncomes);
  }


  BiggerIncomesInLastMounth_Charts(BiggerIncomes: Array<any>) { //los ultimos 3 incomes con mayor ingreso del mes.
    const ctx = document.getElementById("myChart");
    if(this.chartIncomes != undefined){
      this.chartIncomes.destroy();
    }
    this.chartIncomes = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: [],
          datasets: [{
              label: [],
              data: [],
              //data: [ Math.floor(Math.random()*(240-20+1)+20) ,Math.floor(Math.random()*(240-20+1)+20),Math.floor(Math.random()*(240-20+1)+20) ],
              backgroundColor: [
              ],
              borderColor: [
              ],
              borderWidth: 1,
          }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Ingresos Mas significativos al mes'
        },
        scales: {
          yAxes: [{
            ticks: {
                beginAtZero: true
            }
          }] 
        },
    } 
  });
  let rojo = 0, verde = 0, azul = 0;
  let color = 'rgba(255, 99, 132, 0.2)';
  let borde = 'rgba(255, 99, 132, 1)';
  BiggerIncomes.forEach(income => {
    this.chartIncomes.data.datasets[0].data.push(income.amount);
    this.chartIncomes.data.labels.push(income.description);
    rojo = Math.floor(Math.random()*(240-20+1)+20);  
    verde = Math.floor(Math.random()*(240-20+1)+20);
    azul = Math.floor(Math.random()*(240-20+1)+20);
    color = "rgba(" + rojo + "," + verde + "," + azul + ", 0.3)"; 
    borde = "rgba(" + rojo + "," + verde + "," + azul + ", 1)"; 
    this.chartIncomes.data.datasets[0].backgroundColor.push(color);
    this.chartIncomes.data.datasets[0].borderColor.push(borde);
  });
  this.chartIncomes.update();
  }


  AverageIncomes(){
    let ActualDate = this.datePipe.transform(Date(), 'yyyy-MM-dd');
    this._IncomeService.getIncomesByIdAndDateS(parseInt(localStorage.getItem("idUser")),ActualDate,this.diasBusqueda).subscribe((res)=>{
      if(res.status === true){
        console.log(res);
        this.incomesMonth = res.incomes
        console.log("\n----------------------\n");
        let AverageIncomes = 0;
        this.incomesMonth.forEach(income => {
          AverageIncomes += income.amount;
        });
        this.averageIncomes = AverageIncomes / this.incomesMonth.length;
        this.averageIncomes = parseFloat(this.averageIncomes.toFixed(2)); //dejar solo 2 decimales
        //console.log(AverageIncomes / this.FrecuenciesIncomes.length)
        this.Incomes_Charts(this.incomesMonth);
      } 
    },(error) =>{
      console.log(error);
    }).unsubscribe;
  }
  Incomes_Charts(incomesMonth: Array<any>) { //promedio de money ganada.
    const ctx = document.getElementById("myChart2");
    console.log('Grafico average: ' + this.incomesMonth);
    this.chartIncomesMonth = new Chart(ctx, {
      type: 'doughnut',
      data: {
          labels: [],
          datasets: [{
              label: [],
              data: [],
              backgroundColor: [
                  //'rgba(255, 99, 132, 0.2)',
                  //'rgba(54, 162, 235, 0.2)',
                  //'rgba(255, 206, 86, 0.2)'
              ],
              borderColor: [
                  //'rgba(255, 99, 132, 1)',
                  //'rgba(54, 162, 235, 1)',
                  //'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1,
          }]
      },
      options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        title: {
          display: true,
          text: 'Ingresos del mes'
        }
    } 
  });
  let rojo = 0, verde = 0, azul = 0;
  let color = 'rgba(255, 99, 132, 0.2)';
  let borde = 'rgba(255, 99, 132, 1)';
  incomesMonth.forEach(income => {
    this.chartIncomesMonth.data.datasets[0].data.push(income.amount);
    this.chartIncomesMonth.data.labels.push(income.description);
    rojo = Math.floor(Math.random()*(240-20+1)+20);  
    verde = Math.floor(Math.random()*(240-20+1)+20);
    azul = Math.floor(Math.random()*(240-20+1)+20);
    color = "rgba(" + rojo + "," + verde + "," + azul + ", 0.3)"; 
    borde = "rgba(" + rojo + "," + verde + "," + azul + ", 1)"; 
    this.chartIncomesMonth.data.datasets[0].backgroundColor.push(color);
    this.chartIncomesMonth.data.datasets[0].borderColor.push(borde);
  });
  this.chartIncomesMonth.update();
  }


   //Basica de alerta
   async presentAlert(header,msg) {
    const alert = await this.alertController.create({
      header: header,
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  mostrarInformacion(){
    let mensaje = 'En este apartado usted podra observar informacion acerca de sus ingresos ya procesados';
    this.presentAlert('Informacion',mensaje);
  }
 

}
