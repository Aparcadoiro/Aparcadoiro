//Importaciones de Angular y Ionic.
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { User } from '../shared/user.interface';

//Componentes para usar los archivos de verify email
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})

//Funcion para exportar la clase VerifyEmailPage
export class VerifyEmailPage {
  
  //Funcion para deifinir la variable user, como una 
  user$:Observable<User> = this.authSvc.afAuth.user;

  constructor(private authSvc:AuthService, private modalCtrl: ModalController) { }

  async onSendEmail():Promise<void>{
    try{
      this.authSvc.sendVerificationEmail();
      this.closeModal()
    }catch(error){
      console.log('Error->', error);
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  ngOnDestroy():void{
    this.authSvc.logout();
  }
}
