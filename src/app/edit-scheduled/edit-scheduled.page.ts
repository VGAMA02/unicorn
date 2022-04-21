import { Component, OnInit } from '@angular/core';
import { IonRefresher, NavController } from '@ionic/angular';
import { EditScheduledService } from './edit-scheduled.service';
import { AlertController }   from '@ionic/angular';
import { Events } from '../events';
@Component({
  selector: 'app-edit-scheduled',
  templateUrl: './edit-scheduled.page.html',
  styleUrls: ['./edit-scheduled.page.scss'],
  providers: [EditScheduledService]
})
export class EditScheduledPage implements OnInit {
  public option: number = 1;
  schedules: Array<any>
  constructor(private navCtrl: NavController,
    private _EditScheduledService: EditScheduledService,
    private alertController: AlertController,
    private _Events: Events) {
      this.getSchedules();
    }
  ngOnInit() {
    this.getSchedules();
  }
  regresar(){
    this._Events.homeChangeSubject.next();
    this.navCtrl.navigateForward('menu/home');
  }
  actualizarTipoMov($event){
    this.option = $event.target.value;
    this.getSchedules();
  }
  getSchedules(){
    //var myDate = new Date();
    //var myDateString = myDate.toISOString().slice(0, 10);
    //myDate.toString();
    //this._ShowIncomesService.getIncomes(parseInt(localStorage.getItem("idUser")) , myDateString  ,parseInt(localStorage.getItem("searchDays")) ).subscribe((res)=>{
    this._EditScheduledService.getSchedules(parseInt(localStorage.getItem("idUser")), this.option ).subscribe((res)=>{
     if(res.status === true){
       console.log(res);
       this.schedules = res.schedules
       console.log("--------------------------------------------------------------------------------");
       console.log(this.schedules);
     }
   },(error) =>{
     console.log(error);
   }).unsubscribe
 }
  mostrarInformacion(){
    let mensaje = 'En este apartado usted podra modificar o eliminar los movimientos programados. \n';
    mensaje = mensaje + 'Tenga cuidado con elimar sus registros ya que se perderan para siempre. \n';
    this.getSchedules();
    this.presentAlert('Informacion',mensaje);
    //alert('En este apartado usted podra registrar y programar movimientos. \n');
  }
  eliminarProgramadoPregunta(idSheduledInput){
    let header = 'Atencion!';
    let mensaje = '¿desea eliminar este movimiento programado?';
    this.BorrarAlert(header,mensaje,idSheduledInput);
  }
  eliminarProgramadoAccion(idSheduledInput){
    this._EditScheduledService.changeScheduleDelete(parseInt(localStorage.getItem("idUser")),idSheduledInput).subscribe((res)=>{
      if(res.status === true){
        console.log("Scheduled Cambiado-Eliminado");
        console.log(res.status);
        //console.log(this.schedules);
        this.getSchedules();
      }
    },(error) =>{
      console.log(error);
    }).unsubscribe
    
  }
  editarProgramado(idSheduledInput){
    localStorage.setItem("idSheduledInput",idSheduledInput);
    this.navCtrl.navigateForward('/editing-scheduled');
  }
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
  async BorrarAlert(header,msg,idSheduledInput) {
    const alert = await this.alertController.create({
      header: header,
      message: msg,
      buttons: ['Cancel',{
        text: 'Ok',
        handler: (value: any) => {
          console.log('Ok clicked');
          this.eliminarProgramadoAccion(idSheduledInput);
        }
      }]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


}
