//importaciones de angular core
import { Component } from '@angular/core';
import { Router } from '@angular/router';
//importacion de service de auth service
import { AuthService } from '../service/auth.service';
//importacion de modal controller 
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  //contrusctor para private y public Modal controller 
  constructor(private authSvc:AuthService, private router:Router, private modalCtrl: ModalController) { }
  //RestPassword con correo email 
  async onResetPassword(email){
    try{
      await this.authSvc.resetPassword(email.value);
      this.router.navigate(['/home']);
    }
    catch(error){
      console.log('Error->',error);
    }
  }
//cerrar modal 
  closeModal() {
    this.modalCtrl.dismiss();
  }
}
