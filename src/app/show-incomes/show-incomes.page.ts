import { Component, OnInit } from '@angular/core';
import { ShowIncomesService } from './show-incomes.service';
import { NavController } from '@ionic/angular';
import { Events } from '../events';
@Component({
  selector: 'app-show-incomes',
  templateUrl: './show-incomes.page.html',
  styleUrls: ['./show-incomes.page.scss'],
  providers:[ShowIncomesService]
})
export class ShowIncomesPage implements OnInit {
  incomes: Array<any>
  constructor(private navCtrl: NavController, private _ShowIncomesService: ShowIncomesService,
    public _Events:Events
    ) {
     }
  ngOnInit() {
    console.log('obteniendo incomes');
    this.getIncomes();
   
  }
  exa(){
    console.log('FFProbando');
    this._Events.homeChangeSubject.next();
    this.navCtrl.navigateForward('menu/home');
  }
  actualizarTipoMov($event){
    
  }
   getIncomes(){
       var myDate = new Date();
       var myDateString = myDate.toISOString().slice(0, 10);
       myDate.toString();
       //this._ShowIncomesService.getIncomes(parseInt(localStorage.getItem("idUser")) , myDateString  ,parseInt(localStorage.getItem("searchDays")) ).subscribe((res)=>{
       this._ShowIncomesService.getIncomes(parseInt(localStorage.getItem("idUser")) ).subscribe((res)=>{
        if(res.status === true){
          console.log(res);
          this.incomes = res.incomes
          console.log("--------------------------------------------------------------------------------");
          console.log(this.incomes);
        }
      },(error) =>{
        console.log(error);
      }).unsubscribe
    }
}
