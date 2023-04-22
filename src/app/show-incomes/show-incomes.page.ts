import { Component, OnInit } from '@angular/core';
import { ShowIncomesService } from './show-incomes.service';
import { NavController } from '@ionic/angular';
import { Events } from '../events';
import { AlertController }   from '@ionic/angular';
@Component({
  selector: 'app-show-incomes',
  templateUrl: './show-incomes.page.html',
  styleUrls: ['./show-incomes.page.scss'],
  providers:[ShowIncomesService]
})
export class ShowIncomesPage implements OnInit {
  incomes: Array<any>
  constructor(private navCtrl: NavController, private _ShowIncomesService: ShowIncomesService,
    public _Events:Events, private alertController: AlertController
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

    mostrarInformacion(){
      let mensaje = 'En este apartado usted podra observar los ingresos que ya han sido realizados OJO no aquellos que han sido registrado a futuro si no los que ya han sido procesados (aquellos que cuentan para su saldo actual)';
      this.presentAlert('Informacion',mensaje);
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
