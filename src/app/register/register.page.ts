import { Component, OnInit } from '@angular/core';
import { FormGroup,
  FormControl,
  Validators,
  FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { RegisterService } from './register.service';


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
  registro(){
    let form = this.RegisterForm.value
     if(form.password != form.password2 || form.password == "")
     {
       alert("La contraseña  no coincide!!!");
       console.log("La contraseña no coincide");
     }else{
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
}
