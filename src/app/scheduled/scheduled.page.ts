import { Component, OnInit, ɵflushModuleScopingQueueAsMuchAsPossible } from '@angular/core';
import { FormGroup,
  FormControl,
  Validators,
  FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ScheduledService } from './scheduled.service';
import { DatePipe } from '@angular/common';
import { AlertController }   from '@ionic/angular';
import { Events } from '../events';
@Component({
  selector: 'app-scheduled',
  templateUrl: './scheduled.page.html',
  styleUrls: ['./scheduled.page.scss'],
  providers:[ScheduledService, DatePipe]
})
export class ScheduledPage implements OnInit {
  
  ScheduledForm: FormGroup
  constructor(public formBuilder: FormBuilder,
    private _ScheduledService: ScheduledService,
    public navCtrl: NavController,
    private datePipe: DatePipe,
    public alertController: AlertController,
    public _Events: Events ) 
    {
      this.ScheduledForm = this.formBuilder.group({ 
        'idTypeInput': new FormControl('',Validators.required),
        'amount': new FormControl('',Validators.required),
        'description': new FormControl('',Validators.required),
        'idType': new FormControl('',Validators.required),
        'idUser': new FormControl('',Validators.required),
        'status': new FormControl('',Validators.required),
        'startDate': new FormControl('',Validators.required),
        'endDate': new FormControl('',Validators.required),
        'lastUpdate': new FormControl('',Validators.required),
      });
   }

  ngOnInit() {
    
  }
  regresar(){
    this._Events.homeChangeSubject.next();
    this.navCtrl.pop().then(() => {
    });;
  }
  crearScheduled(){
     this.ScheduledForm.controls['status'].setValue(1);
     //declarar idUser
     let idUser = localStorage.getItem("idUser");
     this.ScheduledForm.controls['idUser'].setValue(idUser);
     //asignar form
     let form = this.ScheduledForm.value;
     //LLENAR LOS DATOS DE LA FECHA SI NO AGARRA
     console.log("date:" + form.startDate);
     if(form.startDate == null || form.startDate == ''){
      let ActualDate = Date();
      ActualDate = this.datePipe.transform(ActualDate, 'yyyy-MM-dd');
      console.log("llenando los datos de date");
      console.log(ActualDate);
      this.ScheduledForm.controls['startDate'].setValue(ActualDate);
      form = this.ScheduledForm.value;
     }
     else{
      this.ScheduledForm.controls['startDate'].setValue(this.datePipe.transform(form.startDate, 'yyyy-MM-dd'));
      form = this.ScheduledForm.value;
     }
     //LLENAR LOS DATOS DE LA FECHA FINAL 
     console.log(form.startDate);
     console.log(this.datePipe.transform(Date(), 'yyyy-MM-dd'));
     //AQUI INSERTAMOS LASTUPDATE O ENDATE
     if(form.idType == 1 && form.startDate <= this.datePipe.transform(Date(), 'yyyy-MM-dd')  ){
        let LastDate = Date();
        LastDate = this.datePipe.transform(LastDate, 'yyyy-MM-dd');
        console.log("llenando los datos de endDate");
        console.log(LastDate);
        this.ScheduledForm.controls['endDate'].setValue(LastDate);
        this.ScheduledForm.controls['lastUpdate'].setValue(null);
        //this.ScheduledForm.controls['lastUpdate'].setValue(LastDate);
        form = this.ScheduledForm.value;
     }
     else if(form.idType == 3  || form.idType == 4){
        this.ScheduledForm.controls['lastUpdate'].setValue(form.startDate);
        this.ScheduledForm.controls['endDate'].setValue(null);
        form = this.ScheduledForm.value;
     }
     else{
        this.ScheduledForm.controls['endDate'].setValue(null);
        this.ScheduledForm.controls['lastUpdate'].setValue(null);
        form = this.ScheduledForm.value;
     }
     if(form.idTypeInput == "" || form.idType == "" || form.amount <= 0  || form.description == '')
     {
       if(form.amount <= 0){
         this.presentAlert('Error','La cantidad insertada no puede ser 0 o negativa, marque el movimiento como gasto.');
       }
       else{
        this.presentAlert('Error','Por favor verifique que los datos no esten vacios.');
       }
       console.log("LLena la wea pibe!");
       
       return;
     }else{
        console.log(form);
        //aqui iria el if para hacer el agendado y el agreagado normal
        this._ScheduledService.addScheduled(form).subscribe((res)=>{
          if(res.status === true){
          this.ScheduledForm.reset();
          this._Events.homeChangeSubject.next();


          this.generarCategoria();


          this.navCtrl.pop().then(() => {
          });;
          //this.navCtrl.navigateForward('menu/home');
          }
        },(error) =>{
          console.log(error);
        })
     }
     
  }//crear scheduled


  generarCategoria(){
    ///DIVERSION
    this._ScheduledService.AsingCategoryDiversion(localStorage.getItem("idUser")).subscribe((res)=>{
      if(res.status === true){
          console.log("\nScheduled Diversion actualizados");
      }
    },(error) =>{
      console.log(error);
    })
    ///HIGIENE
    this._ScheduledService.AsingCategoryHigiene(localStorage.getItem("idUser")).subscribe((res)=>{
      if(res.status === true){
          console.log("\nScheduled Higiene actualizados");
      }
    },(error) =>{
      console.log(error);
    })
    ///Ropa
    this._ScheduledService.AsingCategoryRopa(localStorage.getItem("idUser")).subscribe((res)=>{
      if(res.status === true){
          console.log("\nScheduled Ropa actualizados");
      }
    },(error) =>{
      console.log(error);
    })
    ///Transporte
    this._ScheduledService.AsingCategoryTransporte(localStorage.getItem("idUser")).subscribe((res)=>{
      if(res.status === true){
          console.log("\nScheduled Transporte actualizados");
      }
    },(error) =>{
      console.log(error);
    })
    ///Casa
    this._ScheduledService.AsingCategoryCasa(localStorage.getItem("idUser")).subscribe((res)=>{
      if(res.status === true){
          console.log("\nScheduled Casa actualizados");
      }
    },(error) =>{
      console.log(error);
    })
    ///Cuentas y pagos
    this._ScheduledService.AsingCategoryCuentasPagos(localStorage.getItem("idUser")).subscribe((res)=>{
      if(res.status === true){
          console.log("\nScheduled Cuentas y pagos actualizados");
      }
    },(error) =>{
      console.log(error);
    })
    ///Alimentacion
    this._ScheduledService.AsingCategoryAlimentacion(localStorage.getItem("idUser")).subscribe((res)=>{
      if(res.status === true){
          console.log("\nScheduled Alimentacion actualizados");
      }
    },(error) =>{
      console.log(error);
    })

  }





  mostrarInformacion(){
    let mensaje = 'En este apartado usted podra registrar y programar movimientos. \n decida si el moviemiento sera un ingreso un egreso, coloque una descripcion \n';
    mensaje = mensaje + 'La cantidad y la frecuencia; en este apartado usted podra elegir si el movimiento se ejecutara una sola vez o muchas. \n';
    mensaje = mensaje + 'el apartado mas importante es la fecha, si usted selecciona la fecha actual con un movimiento unico se generara el movimiento automaticamente \n';
    mensaje = mensaje + 'si selecciona otra fecha quedara registrado para ejecutarse en esta fecha.\n';
    this.presentAlert('Informacion',mensaje);
    //alert('En este apartado usted podra registrar y programar movimientos. \n');
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
  async errorAlert(header,msg) {
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
