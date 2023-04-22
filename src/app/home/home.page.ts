import { Component , OnInit} from '@angular/core';
import { NavController } from '@ionic/angular';
import { HomeService } from './home.service';
import { Events } from '../events';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers:[HomeService]
})
export class HomePage{
  searchDays: number = 7;
  searchDaysIncomes: number = 7;
  searchDaysOutflows: number = 7;
  saldoActual: number;
  saldoFuturo: number;
  nextIncomes: number;
  nextOutflows: number;
  constructor(private navCtrl: NavController, private _HomeService: HomeService, public _Events:Events
  ){
    this.getSaldoActual();
    this.getSaldoFuturo();
    this.getIncomesFuturos();
    this.getEgresosFuturos();
    this._Events.homeChange.subscribe(()=>{
      //console.log('Rerfrescando');
      this.getSaldoActual();
      this.getSaldoFuturo();
      this.getIncomesFuturos();
      this.getEgresosFuturos();
    });
  }
  ngOnInit() {
    localStorage.setItem("ShowIncomeDays",'7');
  }
  irEdit(){
    this.navCtrl.navigateForward('/edit-scheduled');
  }
  irIncomes(){
    console.log("moviendonos a incomes");
    this.navCtrl.navigateForward('show-incomes');
  }
  irOutflows(){
    console.log("moviendonos a outflows");
    this.navCtrl.navigateForward('show-outflows');
  }
  getSaldoActual(){
    this._HomeService.getSaldoActual(parseInt(localStorage.getItem("idUser")) ).subscribe((res)=>{
      if(res.status === true){
        console.log(res);
        this.saldoActual = res.saldo
        console.log(this.saldoActual);
        console.log("\n------------------------------------\n");
      } 
    },(error) =>{
      console.log(error);
    }).unsubscribe; 
  }
  getSaldoFuturo(){
    this._HomeService.getSaldoFuturo(parseInt(localStorage.getItem("idUser")),this.searchDays  ).subscribe((res)=>{
      if(res.status === true){
        console.log(res);
        this.saldoFuturo = res.saldofuturo
        console.log("\n---------------------------\n");
      } 
    },(error) =>{
      console.log(error);
    }).unsubscribe;
  }
  getIncomesFuturos(){
    this._HomeService.getIncomesFuturos(parseInt(localStorage.getItem("idUser")),this.searchDaysIncomes).subscribe((res)=>{
      if(res.status === true){
        console.log(res);
        this.nextIncomes = res.ingresosFuturos
        console.log("\n----------------------\n");
      } 
    },(error) =>{
      console.log(error);
    }).unsubscribe;
  }
  getEgresosFuturos(){
    this._HomeService.getEgresosFuturos(parseInt(localStorage.getItem("idUser")),this.searchDaysOutflows).subscribe((res)=>{
      if(res.status === true){
        console.log(res);
        this.nextOutflows = res.egresosFuturos
        console.log("\n----------------------\n");
      } 
    },(error) =>{
      console.log(error);
    }).unsubscribe;
  }
  actualizarDays($event){
    this.searchDays = $event.target.value;
    console.log("Cambiando seachDays");
    this.getSaldoFuturo();
  }
  actualizarDaysIncomes($event){
    this.searchDaysIncomes = $event.target.value;
    this.getIncomesFuturos();
    console.log("Cambiando seachDaysIncomes y actualizando datos");
  }
  actualizarDaysOutflows($event){
    this.searchDaysOutflows = $event.target.value;
    this.getEgresosFuturos();
    console.log("Cambiando seachDaysOutflows");
  }

}
