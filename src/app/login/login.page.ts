import { Component, OnInit } from '@angular/core';
import { LoginService} from './login.service';
import { FormGroup,
         FormControl,
         Validators,
        FormBuilder} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AlertController }   from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers:[LoginService]
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  constructor(private _LoginService: LoginService,
              public formBuilder: FormBuilder,
              public navCtrl: NavController,
              private alertController: AlertController)
  {
    this.loginForm = this.formBuilder.group({
      'email': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)
    });
  }

  ngOnInit() {
      //let mensaje = 'Las credenciales son erroneas verifique bien su correo o la contraseña';
      //this.presentAlert('Fallo en login',mensaje);
  }
  irRegistro(){
    console.log("register");
    this.navCtrl.navigateForward('register');
  }
  login(){
     let form = this.loginForm.value
    if( (form.email == "") || (form.password == "") ){
      let mensaje = 'LLene todos campos por favor.';
      this.presentAlert('Fallo en login',mensaje);
      return;
    }
    
    console.log(form);
     this._LoginService.login(form).subscribe((res)=>{
      
       if(res.status == true){
       localStorage.clear();
       localStorage.setItem("idUser",res.idUser);
       //console.log(res);
       //console.log(localStorage.getItem("idUser"));
       this.navCtrl.navigateForward('menu/home');
       }
       else{
          let mensaje = 'Las credenciales son erroneas verifique bien su correo o la contraseña';
          this.presentAlert('Fallo en login',mensaje);
       }
       this.loginForm.reset();
       return;
     },(error) =>{
       console.log(error);
     })
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
