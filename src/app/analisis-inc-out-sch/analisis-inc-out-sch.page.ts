import { Component, OnInit } from '@angular/core';
import { AnalisisIncOutSchService } from './analisis-inc-out-sch.service';
import * as Chart from "chart.js";
import { DatePipe } from '@angular/common';
import { AlertController }   from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Events } from '../events';
@Component({
  selector: 'app-analisis-inc-out-sch',
  templateUrl: './analisis-inc-out-sch.page.html',
  styleUrls: ['./analisis-inc-out-sch.page.scss'],
  providers: [AnalisisIncOutSchService,DatePipe]
})
export class AnalisisIncOutSchPage implements OnInit {

  constructor(private navCtrl: NavController, private _AnalisisIncOutSchService:AnalisisIncOutSchService, private datePipe:DatePipe,
    private alertController: AlertController, public _Events: Events) {
    //this.getIncomesAndOutflows();
    this._Events.AnalisisChange.subscribe(()=>{
      //console.log('Rerfrescando');

    });
   }
  outflowsMonthNum: number;
  outflowsFutureMonthNum: number;
  averageBalance: number = 0;
  incomesMonthNum: number;
  incomesFutureMonthNum: number;
  averageFutureBalance: number = 0;
  outflowsMonth: Array<any>;
  incomesMonth: Array<any>;
  chartComparation: Chart;
  chartFutureComparation: Chart;

  ngOnInit() {
    this.getIncomesAndOutflows();
    this.getFutureIncomesOutflows();
  }
  ngAfterContentInit(){
    this.getIncomesAndOutflows();
    this.getFutureIncomesOutflows();
  }
  generarGraficoBoton(){
    this.getIncomesAndOutflows();
    this.getFutureIncomesOutflows();
  }
  mostrarInfo(){
    let msg = "En este apartado usted puede ver el analisis de sus ingresos y sus egresos de manera grafica";
    let header = "INFO"
    this.presentAlert(header,msg);
  }
  //////////////////////////////////////////////////////
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
  //////////////////////////////
  getIncomesAndOutflows(){ //funcion para sacar los datos del grafico de comparacion de incomes y outflows reales.
    let ActualDate = this.datePipe.transform(Date(), 'yyyy-MM-dd');
    this._AnalisisIncOutSchService.getOutflowsByIdAndDateS(parseInt(localStorage.getItem("idUser")),ActualDate,60).subscribe((res)=>{
      if(res.status === true){
        console.log(res);
        this.outflowsMonthNum = res.outflows.GastosUnicos;
        console.log("\noutflows cantidad: " + this.outflowsMonthNum + "\n");
      } 
    },(error) =>{
      console.log(error);
    }).unsubscribe;
    this._AnalisisIncOutSchService.getIncomesByIdAndDateS(parseInt(localStorage.getItem("idUser")),ActualDate,60).subscribe((res)=>{
      if(res.status === true){
        console.log(res);
        this.incomesMonthNum = res.incomes.IngresosUnicos;
        console.log("\nIncomes cantidad: " + this.incomesMonthNum + "\n");
        this.comparationIncOut(this.incomesMonthNum ,this.outflowsMonthNum); //tiene que estar aqui dentro de la funcion para funcionar
        let average = this.outflowsMonthNum + this.incomesMonthNum;
        this.averageBalance = (this.incomesMonthNum * 100) / average;
        this.averageBalance = parseFloat(this.averageBalance.toFixed(2)); //dejar solo 2 decimales
      } 
    },(error) =>{
      console.log(error);
    }).unsubscribe;
    
  }
  comparationIncOut(incomes: number, outflows: number){
    const ctx = document.getElementById("ComparationChart");
    console.log(ctx);
    if(ctx != undefined)
    {
      this.chartComparation = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Ingresos','Gastos'],
            datasets: [{
                label: ['Ingresos','Gastos'],
                data: [incomes,outflows],
                backgroundColor: [
                    'rgba(20, 100, 255, 0.2)',
                    'rgba(255, 100, 132, 0.2)',
                    //'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(20, 100, 255, 1)',
                    'rgba(240, 100, 132, 1)',
                    //'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1,
            }]
        },
        options: {
          responsive: true,
          scales: {
               
          },
          title: {
            display: true,
            text: 'Comparacion de Ingresos con Egresos del Mes'
          }
        } 
      });
        //this.chartComparation.update();
    }//if de comprobacion
    else{
      console.log("NO SE HA GENEREADO EL GRAFICO DE COMPARACION POR FAVOR REVISA EL PORQUE.");
    }
  }
  getFutureIncomesOutflows(){
    this._AnalisisIncOutSchService.getEgresosFuturos(parseInt(localStorage.getItem("idUser")),30).subscribe((res)=>{
      if(res.status === true){
        console.log(res);
        this.outflowsFutureMonthNum = res.egresosFuturos;
        console.log("\noutflowsFuturos cantidad: " + this.outflowsFutureMonthNum + "\n");
      } 
    },(error) =>{
      console.log(error);
    }).unsubscribe;

    this._AnalisisIncOutSchService.getIncomesFuturos(parseInt(localStorage.getItem("idUser")),30).subscribe((res)=>{
      if(res.status === true){
        console.log(res);
        this.incomesFutureMonthNum = res.ingresosFuturos
        console.log("\nincomesFuturos cantidad: " + this.incomesFutureMonthNum  + "\n");
        this.getFutureIncomesOutflowsChart(this.incomesFutureMonthNum, this.outflowsFutureMonthNum);
        let average = this.outflowsFutureMonthNum + this.incomesFutureMonthNum;
        this.averageFutureBalance = (this.incomesFutureMonthNum * 100) / average;
        this.averageFutureBalance = parseFloat(this.averageFutureBalance.toFixed(2)); //dejar solo 2 decimales
        console.log("\npromedio futuro: " + this.averageFutureBalance  + "\n");
      } 
    },(error) =>{
      console.log(error);
    }).unsubscribe;
  }


  getFutureIncomesOutflowsChart(incomes: number, outflows: number){
    const ctx = document.getElementById("ComparationFutureChart");
    console.log(ctx);
    if(ctx != undefined)
    {
      this.chartFutureComparation = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Ingresos','Gastos'],
            datasets: [{
                label: ['Ingresos','Gastos'],
                data: [incomes,outflows],
                backgroundColor: [
                    'rgba(50, 150, 240, 0.2)',
                    'rgba(255, 70, 125, 0.2)',
                    //'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(50, 150, 240, 1)',
                    'rgba(255, 70, 125, 1)',
                    //'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1,
            }]
        },
        options: {
          responsive: true,
          scales: {
               
          },
          title: {
            display: true,
            text: 'Comparacion de Ingresos con Egresos Futuros a un Mes'
          }
        } 
      });
    }
  }

  irRecomendaciones(){
    this.navCtrl.navigateForward('/recomendaciones');
  }


}
