import { NgModule } from "@angular/core";
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@NgModule()
export class Alerts {

    constructor(
        public alertCtrl: AlertController,
        public toastController: ToastController,
        public router: Router) {

    }

    async presentAlert(header, message, buttons:Array<any> = ['Aceptar']) {
        const alert = await this.alertCtrl.create({
            header: header,
            message: message,
            buttons: buttons
        });
        await alert.present();
    }

    async presentToast(header, message, duration = 1000, position: any = 'bottom', buttons = []) {
        const toast = await this.toastController.create({
            header: header,
            message: message,
            position: position,
            duration: duration,
            buttons: buttons
        });
        await toast.present();
    }
}