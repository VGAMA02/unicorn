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
  searchDaysIncomes: number = 21;
  searchDaysOutflows: number = 21;
  saldoActual: number;
  saldoFuturo: number;
  nextIncomes: number;
  nextOutflows: number;

  constructor(private navCtrl: NavController, private _HomeService: HomeService, public _Events:Events
  ){
    
    //this.searchDays = 7
    //localStorage.setItem("searchDays",this.searchDays.toString());
    //localStorage.setItem("searchDaysIncomes",this.searchDays.toString());
    //localStorage.setItem("searchDaysOutflows",this.searchDays.toString());
    //alert(parseInt(localStorage.getItem("searchDays")) );
    this.getSaldoActual();
    this.getSaldoFuturo();
    this._Events.homeChange.subscribe(()=>{
      console.log('Rerfrescando');
      this.getSaldoActual();
      this.getSaldoFuturo();
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
        console.log("--------------------------------------------------------------------------------");
        console.log(this.saldoActual);
      }
       
    },(error) =>{
      console.log(error);
    }).unsubscribe;

    
  }
  getSaldoFuturo(){
    this._HomeService.getSaldoFuturo(parseInt(localStorage.getItem("idUser")),parseInt(localStorage.getItem("searchDays"))  ).subscribe((res)=>{
      if(res.status === true){
        console.log(res);
        this.saldoFuturo = res.saldo
        console.log("--------------------------------------------------------------------------------");
        console.log(this.saldoActual);
      }
       
    },(error) =>{
      console.log(error);
    }).unsubscribe;
  }
  actualizarDays($event){
    this.searchDays = $event.target.value;
    localStorage.setItem("searchDays",this.searchDays.toString());
    console.log("Cambiando seachDays");
    this.getSaldoFuturo();
  }
  actualizarDaysIncomes($event){
    this.searchDaysIncomes = $event.target.value;
    localStorage.setItem("searchDaysIncomes",this.searchDaysIncomes.toString());
    console.log("Cambiando seachDaysIncomes y actualizando datos");
    
  }
  actualizarDaysOutflows($event){
    this.searchDaysOutflows = $event.target.value;
    localStorage.setItem("searchDaysOutflows",this.searchDaysOutflows.toString());
    console.log("Cambiando seachDaysOutflows");
  }
}
