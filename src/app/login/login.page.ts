//importaciones de angular 
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
//importacion de recuperacion de contraseña 
import { ForgotPasswordPage } from '../forgot-password/forgot-password.page';
//Importacion de registro TS
import { RegisterPage } from '../register/register.page';
//importacion del auth service
import { AuthService } from '../service/auth.service';
//Importacion de la verificacion de email 
import { VerifyEmailPage } from '../verify-email/verify-email.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  modal: any;
  verificado: boolean = true;
  verificado1: boolean = true;
  
  constructor(private authSvc: AuthService, private router:Router, private modalCtrl: ModalController) { }
  //sistema de logueo ONLOGIN con email y contraseña 
  async onLogin(email,password){
   try{
      const user = await this.authSvc.login(email.value,password.value);
      if(user){
        //comprobar si el usuario se encuentra verificado en el sistema 
        const isVerified = this.authSvc.isEmailVerified(user);
        console.log('Verified->', isVerified)
        this.redirectUser(isVerified);
      }
      else{
        this.verificado1 = false;
        setTimeout(()=>{
          this.verificado1 = true;
        }, 3000)
      }
   }
   catch(error){
      console.log('Error ->',error)
   }
  }

  //Sistema de incio de sesion con google componente firebase 
  async onLoginGoogle(){
    try{
      const user = await this.authSvc.LoginGoogle();
      if(user){
       //comporbar si el usuario se encuentra verificado en el sistema 
       const isVerified = this.authSvc.isEmailVerified(user);
       this.redirectUser(isVerified);
      }
    }
    catch(error){
      console.log('Error->',error)
    }
  }
  //redireccionar usuario 
  private redirectUser(isVerified:boolean):void{
    if(isVerified){
      this.router.navigate(['../user']); 
      this.closeModal();
    }else{
      this.closeModal();
      this.openVerifyModal();
    }
  }
  //abrir modal de verificacion de email
  async openVerifyModal(){
    const modalVerify = await this.modalCtrl.create({
      component: VerifyEmailPage,
    });
    
    await modalVerify.present();

    }
    //abrir el modal de restablecer contraseña 
  async openForgotModal(){
    const modalForgot = await this.modalCtrl.create({
      component: ForgotPasswordPage,
    });
    
    await modalForgot.present();

    }
    //abrir el modal del registro de usuario
  async openRegisterModal(){
    const modalRegister = await this.modalCtrl.create({
      component: RegisterPage,
    });
    
    await modalRegister.present();

    }
  //cerrar modal
  closeModal() {
    this.modalCtrl.dismiss();
  }



  
}

