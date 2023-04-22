import { Component, OnInit } from '@angular/core';
import { OutflowService } from './outflow.service';
import * as Chart from "chart.js";
import { DatePipe } from '@angular/common';
import { AlertController }   from '@ionic/angular';
@Component({
  selector: 'app-outflow',
  templateUrl: './outflow.page.html',
  styleUrls: ['./outflow.page.scss'],
  providers: [OutflowService,DatePipe]
})
export class OutflowPage implements OnInit {

  constructor(private _OutflowService:OutflowService, private datePipe: DatePipe, private alertController: AlertController) {
    //this.getOutflowsInLastMonth();
    //this.getOutflowsLimiterPage();
    //this.AverageOutflows();
   
   }
  limiter: number = 3;
  averageOutflows: number = 0;
  outflows: Array<any>;
  biggerOutflows: Array<any>;
  outflowsMonth: Array<any>;
  chartBiggerOutflows: Chart;
  chartOutflows: Chart;
  diasBusqueda: number = 30;
  ngOnInit() {
    this.getOutflowsInLastMonth();
    this.AverageOutflows();
    this.getOutflowsLimiterPage();
    //this.BiggerOutflowsInLastMounth_Charts(this.biggerOutflows);
  }
  ngAfterContentInit(){
    //this.getOutflowsInLastMonth();
    //this.AverageOutflows();
    //this.getOutflowsInLastMonth();
  }

  ionViewWillEnter(){
    console.log("\n\nActualizando Graficos");
    this.getOutflowsInLastMonth();
    this.AverageOutflows();
    //this.getIncomesLimiterPage();
  }
  
  generarGraficoBoton(){
    this.getOutflowsLimiterPage();
    this.getOutflowsInLastMonth(); //genera grafico
    this.AverageOutflows(); //genera grafico
    //this.BiggerOutflowsInLastMounth_Charts(this.biggerOutflows);
  }
  getOutflowsLimiterPage(){
    this._OutflowService.getOutflowsLimiter(parseInt(localStorage.getItem("idUser")),this.limiter).subscribe((res)=>{
      if(res.status === true){
        console.log(res);
        this.outflows = res.outflows;
        console.log("\n outflows: " + this.outflows + "\n");
      } 
    },(error) =>{
      console.log(error);
    }).unsubscribe;
  }
  getOutflowsInLastMonth(){
    this._OutflowService.getBiggerOutflowsInLastDaysS(parseInt(localStorage.getItem("idUser")),this.limiter,this.diasBusqueda).subscribe((res)=>{
      if(res.status === true){
        console.log(res);
        this.biggerOutflows = res.outflows;
        console.log("\nbiggerOutflows:" + this.biggerOutflows + " \n");
        this.BiggerOutflowsInLastMounth_Charts(this.biggerOutflows);
      } 
    },(error) =>{
      console.log(error);
    }).unsubscribe;
    //this.BiggerIncomesInLastMounth_Charts(this.BiggerIncomes);
  }
  BiggerOutflowsInLastMounth_Charts(BiggerOutflows: Array<any>){
    const ctx = document.getElementById("biggestOutflowsChart");
    console.log(ctx);
    console.log(BiggerOutflows);
    if(this. chartBiggerOutflows != undefined){
      this. chartBiggerOutflows.destroy();
    }
    this.chartBiggerOutflows = new Chart(ctx, {
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
          text: 'Gastos Mas significativos al mes'
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
  BiggerOutflows.forEach(outflow => {
    this.chartBiggerOutflows.data.datasets[0].data.push(outflow.amount);
    this.chartBiggerOutflows.data.labels.push(outflow.description);
    rojo = Math.floor(Math.random()*(240-20+1)+20);  
    verde = Math.floor(Math.random()*(240-20+1)+20);
    azul = Math.floor(Math.random()*(240-20+1)+20);
    color = "rgba(" + rojo + "," + verde + "," + azul + ", 0.3)"; 
    borde = "rgba(" + rojo + "," + verde + "," + azul + ", 1)"; 
    this.chartBiggerOutflows.data.datasets[0].backgroundColor.push(color);
    this.chartBiggerOutflows.data.datasets[0].borderColor.push(borde);
  });

  this.chartBiggerOutflows.update();
  }


  AverageOutflows(){
    let ActualDate = this.datePipe.transform(Date(), 'yyyy-MM-dd');
    this._OutflowService.getOutflowsByIdAndDateS(parseInt(localStorage.getItem("idUser")),ActualDate,this.diasBusqueda).subscribe((res)=>{
      if(res.status === true){
        console.log(res);
        this.outflowsMonth = res.outflows
        console.log("\noutflows completos: " + this.outflowsMonth + "\n");
        let averageOutflows = 0;
        this.outflowsMonth.forEach(outflow => {
          averageOutflows += outflow.amount;
        });
        this.averageOutflows = averageOutflows / this.outflowsMonth.length;
        this.averageOutflows = parseFloat(this.averageOutflows.toFixed(2)); //dejar solo 2 decimales
        //console.log(AverageIncomes / this.FrecuenciesIncomes.length)
        this.outflows_Charts(this.outflowsMonth);
      } 
    },(error) =>{
      console.log(error);
    }).unsubscribe;
  }


  outflows_Charts(averageOutflows: Array<any>){
    const ctx = document.getElementById("OutflowsChart");
    //if(this.chartIncomes != undefined){
    //  this.chartIncomes.destroy();
    //}
    console.log('Grafico average: ' + this.outflowsMonth);
    this.chartOutflows = new Chart(ctx, {
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
          text: 'Gastos del mes'
        }
    } 
  });
    let rojo = 0, verde = 0, azul = 0;
    let color = 'rgba(255, 99, 132, 0.2)';
    let borde = 'rgba(255, 99, 132, 1)';
    averageOutflows.forEach(outflow => {
      this.chartOutflows.data.datasets[0].data.push(outflow.amount);
      this.chartOutflows.data.labels.push(outflow.description);
      rojo = Math.floor(Math.random()*(240-20+1)+20);  
      verde = Math.floor(Math.random()*(240-20+1)+20);
      azul = Math.floor(Math.random()*(240-20+1)+20);
      color = "rgba(" + rojo + "," + verde + "," + azul + ", 0.3)"; 
      borde = "rgba(" + rojo + "," + verde + "," + azul + ", 1)"; 
      this.chartOutflows.data.datasets[0].backgroundColor.push(color);
      this.chartOutflows.data.datasets[0].borderColor.push(borde);
    });
    this.chartOutflows.update();
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
    let mensaje = 'En este apartado usted podra observar informacion acerca de sus egresos ya procesados';
    this.presentAlert('Informacion',mensaje);
  }
 

}
