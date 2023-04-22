import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'
import { Events } from '../events';
import { AlertController }   from '@ionic/angular';
import { RecomendacionesService } from './recomendaciones.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.page.html',
  styleUrls: ['./recomendaciones.page.scss'],
  providers: [RecomendacionesService,DatePipe],
})
export class RecomendacionesPage implements OnInit {

  constructor(private navCtrl: NavController, public _Events: Events, private alertController: AlertController,private _RecomendacionesService: RecomendacionesService,
  private datePipe:DatePipe) { 
    
  }
  outflowsMonthNum: number;
  outflowsFutureMonthNum: number;
  averageBalance: number = 0;
  incomesMonthNum: number;
  incomesFutureMonthNum: number;
  averageFutureBalance: number = 0;
  advicesFinanzas: string = "";
  advices: string = "";
  schedulesDiversion: Array<any>
  schedulesDiversionLow: Array<any>
  schedulesTransport: Array<any>
  schedulesWork: Array<any>
  ngOnInit() {
   
    this.getIncomesAndOutflows();
    this.getFutureIncomesOutflows();
    this.getSchedulesTranporte();
    this.getSchedulesWork();
    this.getSchedulesDiversion();
    
  }
  ngAfterContentInit(){
  
  }
  regresar(){
    this._Events.homeChangeSubject.next();
    this.navCtrl.pop().then(() => {
    });;
  }
  mostrarInformacion(){
    let mensaje = 'En este apartado usted podra observar algunas sugerencias y observaciones sobre su manejo del dinero ';
    this.presentAlert('Informacion',mensaje);
  }
  //Conseguir el numero de ingresos

  //Conseguir la cantidad de ingresos versus egresos actuales
  getIncomesAndOutflows(){ //funcion para sacar los datos del grafico de comparacion de incomes y outflows reales.
    let ActualDate = this.datePipe.transform(Date(), 'yyyy-MM-dd');
    this._RecomendacionesService.getOutflowsByIdAndDateS(parseInt(localStorage.getItem("idUser")),ActualDate,60).subscribe((res)=>{
      if(res.status === true){
        console.log(res);
        this.outflowsMonthNum = res.outflows.GastosUnicos;
        console.log("\noutflows cantidad: " + this.outflowsMonthNum + "\n");
      } 
    },(error) =>{
      console.log(error);
    }).unsubscribe;
    this._RecomendacionesService.getIncomesByIdAndDateS(parseInt(localStorage.getItem("idUser")),ActualDate,60).subscribe((res)=>{
      if(res.status === true){
        console.log(res);
        this.incomesMonthNum = res.incomes.IngresosUnicos;
        console.log("\nIncomes cantidad: " + this.incomesMonthNum + "\n");
        let average = this.outflowsMonthNum + this.incomesMonthNum;
        this.averageBalance = (this.incomesMonthNum * 100) / average;
        this.averageBalance = parseFloat(this.averageBalance.toFixed(2)); //dejar solo 2 decimales
        console.log("\naverage Balance: " + this.averageBalance + "\n");
        this.makeAdvices();
      } 
    },(error) =>{
      console.log(error);
    }).unsubscribe;  
  }

  //Conseguir los ingresos y egresos registrados pero que no se han realizado. scheduled
  getFutureIncomesOutflows(){
    this._RecomendacionesService.getEgresosFuturos(parseInt(localStorage.getItem("idUser")),30).subscribe((res)=>{
      if(res.status === true){
        console.log(res);
        this.outflowsFutureMonthNum = res.egresosFuturos;
        console.log("\noutflowsFuturos cantidad: " + this.outflowsFutureMonthNum + "\n");
      } 
    },(error) =>{
      console.log(error);
    }).unsubscribe;

    this._RecomendacionesService.getIncomesFuturos(parseInt(localStorage.getItem("idUser")),30).subscribe((res)=>{
      if(res.status === true){
        console.log(res);
        this.incomesFutureMonthNum = res.ingresosFuturos
        console.log("\nincomesFuturos cantidad: " + this.incomesFutureMonthNum  + "\n");
        let average = this.outflowsFutureMonthNum + this.incomesFutureMonthNum;
        this.averageFutureBalance = (this.incomesFutureMonthNum * 100) / average;
        this.averageFutureBalance = parseFloat(this.averageFutureBalance.toFixed(2)); //dejar solo 2 decimales
        console.log("\npromedio futuro: " + this.averageFutureBalance  + "\n");
        this.makeAdvicesFuture();
      } 
    },(error) =>{
      console.log(error);
    }).unsubscribe;
  }
  //Conseguir cierto tipos de schedules para analizar
  getSchedulesDiversion(){
    this._RecomendacionesService.getSchedulesAnaliticsLimiterDiversion(parseInt(localStorage.getItem("idUser")),7,3,0).subscribe((res)=>{
      if(res.status === true){
        console.log(res);
        this.schedulesDiversion = res.schedules;
        //res.schedules[0].description;
        //this.schedulesDiversion = JSON.parse(this.schedulesDiversion['schedules']);
        console.log(this.schedulesDiversion);
        console.log("\nschedules de diversion cantidad: " + this.schedulesDiversion + "\n");
      } 
    },(error) =>{
      console.log(error);
    }).unsubscribe;

    this._RecomendacionesService.getSchedulesAnaliticsLimiterDiversion(parseInt(localStorage.getItem("idUser")),7,3,1).subscribe((res)=>{
      if(res.status === true){
        console.log(res);
        this.schedulesDiversionLow = res.schedules;
        //res.schedules[0].description;
        //this.schedulesDiversion = JSON.parse(this.schedulesDiversion['schedules']);
        console.log(this.schedulesDiversionLow);
        console.log("\nschedules de diversion low cantidad: " + this.schedulesDiversionLow + "\n");
      } 
    },(error) =>{
      console.log(error);
    }).unsubscribe;
  }

  getSchedulesTranporte(){
    this._RecomendacionesService.getSchedulesAnaliticsTraport(parseInt(localStorage.getItem("idUser"))).subscribe((res)=>{
      if(res.status === true){
        console.log(res);
        this.schedulesTransport = res.schedules;
        console.log("\nTransporte: " + this.schedulesTransport + "\n");
      } 
    },(error) =>{
      console.log(error);
    }).unsubscribe;
  }

  getSchedulesWork(){
    this._RecomendacionesService.getSchedulesAnaliticsWork(parseInt(localStorage.getItem("idUser"))).subscribe((res)=>{
      if(res.status === true){
        console.log(res);
        this.schedulesWork = res.schedules;
        console.log("\nTransporte: " + this.schedulesWork + "\n");
      } 
    },(error) =>{
      console.log(error);
    }).unsubscribe;
    //this.makeAdvices();
  }
  
  makeAdvices(){
 ///GENERAR CONSEJOS
   //AVERAGE BALANCE PARA DECIRLE AL USUARIO COMO VA SU DINERO ACTUAL.
  if(this.averageBalance >= 70){
      this.advicesFinanzas += "\nDe momento ha ganado mas de lo que ha gastado por mucho, mantengase así.";
    }
    else if(this.averageBalance >= 40 && this.averageBalance < 70 ){
      this.advicesFinanzas += "\nSus ingresos y egresos actuales estan balanceados, aun asi podria pensar en hacer algo para gastar menos.";
    }
    else{
      this.advicesFinanzas += "\nHa gastado mas de lo que ha ganado tenga cuidado con los egresos innecesarios.";
    }
  
   
    console.log("AverageBalanceFinal: " + this.averageBalance + "\n");
    
  }


  makeAdvicesFuture(){
    console.log("AverageFutureBalanceFinal: " + this.averageFutureBalance + "\n");
     //LA RECOMENDACION DE "EN QUE PUEDES AHORRAR" SE HACE DESDE HTML

    ///FUTURE BALANCE PARA LA RECOMENDACION DE PELIGRO
    if(this.averageFutureBalance >= 70){ //generar aqui la recomendacion.
      this.advices += "sus ingresos a futuro se ven muy bien!";
    }
    else if(this.averageFutureBalance >= 45 && this.averageFutureBalance < 70){ //generar aqui la recomendacion.
      this.advices += "Sus ingresos a futuro son balanceados";
    }
    else if(this.averageFutureBalance > 21 && this.averageFutureBalance < 45){ //generar aqui la recomendacion.
      this.advices += "Tenga cuidado sus ingresos a futuro van bajos, deberia pensar en disminuir algunos gastos que no sean tan necesarios";
    }
    else if(this.averageFutureBalance <= 20){ //generar aqui la recomendacion.
      this.advices += "Tenga cuidado sus ingresos a futuro van a ser muy bajos, deberia pensar en disminuir algunos gastos\n";
      this.advices += "estos son algunos de los gastos en los que podria ahorrar:\n"
    
    }
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
}
