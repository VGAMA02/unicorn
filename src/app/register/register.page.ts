import { Component, OnInit } from '@angular/core';
import { FormGroup,
  FormControl,
  Validators,
  FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { RegisterService } from './register.service';
import { AlertController }   from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  providers:[RegisterService]
})
export class RegisterPage implements OnInit {

  RegisterForm: FormGroup
  constructor(private _RegisterService: RegisterService,
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    private alertController: AlertController
  )
  {
    this.RegisterForm = this.formBuilder.group({
      'email': new FormControl('',Validators.required),
      'password': new FormControl('',Validators.required),
      'password2': new FormControl('',Validators.required),
      'lastName': new FormControl('',Validators.required),
      'firstName': new FormControl('',Validators.required),
      'birthDate': new FormControl('',Validators.required),
    });
  }
  ngOnInit() {
  }
  irLogin(){
    console.log("login");
    this.navCtrl.navigateForward('login');
  }

  checkEmail(){
    let mensaje = 'El correo no es valido';
    this.presentAlert('Informacion',mensaje);
  }
  validateEmail(email) {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
   }
  registro(){
    let form = this.RegisterForm.value
     if(form.lastName == "" || form.firstName == "" || form.email == "" || form.birthDate == null || form.birthDate == ''){
      let mensaje = 'No puede haber campos vacios llene todos los campos, la fecha incluida';
      this.presentAlert('Informacion',mensaje);
     }
     else if(form.password != form.password2 || form.password == "")
     {
       alert("La contraseña  no coincide!!!");
       console.log("La contraseña no coincide");
     }else{
        if (this.validateEmail(form.email) == false){
          let mensaje = 'El correo no es valido';
          this.presentAlert('Informacion',mensaje);
          return;
        }
        console.log(form);
        this._RegisterService.login(form).subscribe((res)=>{
          if(res.status === true){
          this.RegisterForm .reset();
          this.navCtrl.navigateForward('menu/home');
          }
        },(error) =>{
          console.log(error);
        })
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
