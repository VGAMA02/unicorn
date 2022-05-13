import { Component, OnInit, } from '@angular/core';
import { FormGroup,
  FormControl,
  Validators,
  FormBuilder } from '@angular/forms';
import { EditingScheduledService } from './editing-scheduled.service';
import { NavController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { AlertController }   from '@ionic/angular';
import { Events } from '../events';

@Component({
  selector: 'app-editing-scheduled',
  templateUrl: './editing-scheduled.page.html',
  styleUrls: ['./editing-scheduled.page.scss'],
  providers: [EditingScheduledService,DatePipe]
})
export class EditingScheduledPage implements OnInit {
  idTypeInput: number;
  amount: number;
  description: string;
  idType: number;
  startDate: Date;
  endDate: Date;
  editScheduledForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public datePipe: DatePipe,
    public alertController: AlertController,
    public _EditingScheduledService: EditingScheduledService,
    public _Events:Events
   ) 
    {
      this.editScheduledForm = this.formBuilder.group({
        'idSheduledInput': new FormControl('',Validators.required),
        'idTypeInput': new FormControl('',Validators.required),
        'amount': new FormControl('',Validators.required),
        'description': new FormControl('',Validators.required),
        'idType': new FormControl('',Validators.required),
        'idUser': new FormControl('',Validators.required),
        'startDate': new FormControl('',Validators.required),
        'endDate': new FormControl('',Validators.required),
        'lastUpdate': new FormControl('',Validators.required),
      });
   }
  ngOnInit() {

    this.getScheduled()
  }
  regresar(){
    //this.navCtrl.navigateForward('edit-scheduled');
    this._Events.scheduledChangeSubject.next();
    this.navCtrl.pop().then(() => {
    });;
  }
  mostrarInformacion(){
    let mensaje = 'En este apartado usted podra modificar el movimiento escogido, pulse el boton de regresar para cancelar la edicion. \n';
    this.presentAlert('Informacion',mensaje);
    //alert('En este apartado usted podra registrar y programar movimientos. \n');
  }
  getScheduled(){
    this. _EditingScheduledService.getScheduled(parseInt(localStorage.getItem("idSheduledInput")),parseInt(localStorage.getItem("idUser")) ).subscribe((res)=>{
     if(res.status === true){
       console.log(res);
       this.idTypeInput =  res.scheduled.idTypeInput;
       this.amount = res.scheduled.amount;
       this.description = res.scheduled.description;
       this.idType = res.scheduled.idType;
       this.startDate = res.scheduled.startDate;
       this.editScheduledForm.controls['idTypeInput'].setValue( res.scheduled.idTypeInput);
       this.editScheduledForm.controls['amount'].setValue( res.scheduled.amount);
       this.editScheduledForm.controls['description'].setValue( res.scheduled.description);
       this.editScheduledForm.controls['idType'].setValue( res.scheduled.idType);
     }
   },(error) =>{
     console.log(error);
   }).unsubscribe
 }
 modificarScheduled(){
  let idUser = parseInt(localStorage.getItem("idUser"));
  let idSheduledInput = parseInt(localStorage.getItem("idSheduledInput"));
  console.log('scheduled: ' + idSheduledInput)
  this.editScheduledForm.controls['idUser'].setValue(idUser);
  this.editScheduledForm.controls['idSheduledInput'].setValue(idSheduledInput);
  //asignar form
  let form = this.editScheduledForm.value;
  //LLENAR LOS DATOS DE LA FECHA SI NO AGARRA
  if(form.startDate == null || form.startDate == ''){
   let ActualDate = Date();
   ActualDate = this.datePipe.transform(ActualDate, 'yyyy-MM-dd');
   console.log("llenando los datos de date");
   console.log(ActualDate);
   this.editScheduledForm.controls['startDate'].setValue(ActualDate);
   form = this.editScheduledForm.value;
  }
  else{
    form.startDate = this.datePipe.transform(form.startDate, 'yyyy-MM-dd');  
  }
  //LLENAR LOS DATOS DE LA FECHA FINAL
  if(form.idType == 1 && form.startDate <= this.datePipe.transform(Date(), 'yyyy-MM-dd')){
     let LastDate = Date();
     LastDate = this.datePipe.transform(LastDate, 'yyyy-MM-dd');
     console.log("llenando los datos de endDate");
     console.log(LastDate);
     this.editScheduledForm.controls['endDate'].setValue(LastDate);
     this.editScheduledForm.controls['lastUpdate'].setValue(LastDate);
     form = this.editScheduledForm.value;
  }
  else{
   this.editScheduledForm.controls['endDate'].setValue(null);
   this.editScheduledForm.controls['lastUpdate'].setValue(null);
   form = this.editScheduledForm.value;
  }
  console.log("date:" + form.startDate);
  console.log("idType:" + form.idType);
  console.log("idTypeInput:" + form.idTypeInput);
  console.log("amount:" + form.amount);
  console.log("description:" + form.description);
  console.log("idSheduledInput:" + form.idSheduledInput);
  if(form.idTypeInput == "" || form.idType == "" || form.amount == 0)
  {
    console.log("LLena la wea pibe!");
  }else{
     console.log(form);
     //aqui iria el if para hacer el agendado y el agreagado normal
     this._EditingScheduledService. modificarScheduled(form).subscribe((res)=>{
       if(res.status === true){
          console.log('wea editada');
          //this.editScheduledForm.reset();
          //this.navCtrl.navigateForward('/edit-scheduled');
          this.AdvertirAlert('Movimiento Modificado', 'El movimiento ha sido modificado exitosamente.');
       }
     },(error) =>{
       console.log(error);
     })
  }
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
  async AdvertirAlert(header,msg) {
    const alert = await this.alertController.create({
      header: header,
      message: msg,
      buttons: [{
        text: 'Ok',
        handler: (value: any) => {
          console.log('Ok clicked');
          this._Events.scheduledChangeSubject.next();
          this.navCtrl.navigateForward('/edit-scheduled');
        }
      }]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
