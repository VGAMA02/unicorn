import { Component, OnInit } from '@angular/core';
import { ShowOutflowsService } from './show-outflows.service';
import { NavController } from '@ionic/angular';
import { Events } from '../events';
import { AlertController }   from '@ionic/angular';
@Component({
  selector: 'app-show-outflows',
  templateUrl: './show-outflows.page.html',
  styleUrls: ['./show-outflows.page.scss'],
  providers: [ShowOutflowsService],
})
export class ShowOutflowsPage implements OnInit {

  outflows: Array<any>
  constructor(private navCtrl: NavController, private _ShowOutflowsService: ShowOutflowsService,
    public _Events:Events, private alertController: AlertController
    ) {

     }

  ngOnInit() {
    console.log('obteniendo outflow');
    this.getOutflows();
  }
  regresar(){
    console.log('FFProbando');
    this._Events.homeChangeSubject.next();
    this.navCtrl.navigateForward('menu/home');
  }
   getOutflows(){
       var myDate = new Date();
       var myDateString = myDate.toISOString().slice(0, 10);
       myDate.toString();
       //this._ShowOutflowsService.getOutflows(parseInt(localStorage.getItem("idUser")) , myDateString  ,parseInt(localStorage.getItem("searchDays")) ).subscribe((res)=>{
       this._ShowOutflowsService.getOutflows(parseInt(localStorage.getItem("idUser")) ).subscribe((res)=>{
        if(res.status === true){
          console.log(res);
          this.outflows = res.outflows
          console.log("--------------------------------------------------------------------------------");
          console.log(this.outflows);
        }
      },(error) =>{
        console.log(error);
      }) 
    }
    mostrarInformacion(){
      let mensaje = 'En este apartado usted podra observar los egresos que ya han sido realizados OJO no aquellos que han sido registrado a futuro si no los que ya han sido procesados (aquellos que cuentan para su saldo actual)';
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
