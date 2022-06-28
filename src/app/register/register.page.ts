import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { VerifyEmailPage } from '../verify-email/verify-email.page';
import { AuthService } from './../service/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
 
  form: FormGroup;

  constructor(private authSvc: AuthService, private router:Router, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.minLength(5), Validators.pattern(/^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8),]),
      displayName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    });
  }
  
  async onRegister(email, password, displayName){
  try{
    const user = await this.authSvc.register(email.value, password.value, displayName.value);
    if ( user ){
      console.log('User ->', user);
      const isVerified = this.authSvc.isEmailVerified(user);
      this.redirectUser(isVerified);
    }
  }
    catch(error){
      console.log('Error',error)
    }
  }

  private redirectUser(isVerified:boolean):void{
    if(isVerified){
      this.router.navigate(['/user']);
    }else{
      // else VerificationPage
      this.closeModal();
      this.openVerifyModal();
    }
  }

  async openVerifyModal(){
    const modalVerify = await this.modalCtrl.create({
      component: VerifyEmailPage,
    });
    
    await modalVerify.present();

    }

  async openLoginModal(){
    const modalLogin = await this.modalCtrl.create({
      component: LoginPage,
    });
    
    await modalLogin.present();

    }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
