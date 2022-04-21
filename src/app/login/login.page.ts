import { Component, OnInit } from '@angular/core';
import { LoginService} from './login.service';
import { FormGroup,
         FormControl,
         Validators,
        FormBuilder} from '@angular/forms';
import { NavController } from '@ionic/angular';


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
              public navCtrl: NavController)
  {
    this.loginForm = this.formBuilder.group({
      'email': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)
    });
  }

  ngOnInit() {
  }
  irRegistro(){
    console.log("register");
    this.navCtrl.navigateForward('register');
  }
  login(){
     let form = this.loginForm.value
     this._LoginService.login(form).subscribe((res)=>{
       if(res.status === true){
       localStorage.clear();
       localStorage.setItem("idUser",res.idUser);
       //console.log(res);
       //console.log(localStorage.getItem("idUser"));
       this.loginForm.reset();
       this.navCtrl.navigateForward('menu/home');
       }
     },(error) =>{
       console.log(error);
     })
   }
}
