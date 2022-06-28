import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { LoginPage } from '../login/login.page';
import { Parqueadero } from '../parqueaderos/parqueaderos.model';
import { AuthService } from '../service/auth.service';
import { User } from '../shared/user.interface';

@Component({
  selector: 'app-detailhome',
  templateUrl: './detailhome.component.html',
  styleUrls: ['./detailhome.component.scss'],
})
export class DetailhomeComponent implements OnInit {

  @Input() parqueadero: Parqueadero;

  public user$: Observable<User> = this.authSvc.afAuth.user;

  constructor(
    public authSvc: AuthService,
    private modalCtrl: ModalController) {}

  ngOnInit() {}
  
  closeModal() {
    this.modalCtrl.dismiss(this.parqueadero);
  }

  async openLoginModal(){
    const modalLogin = await this.modalCtrl.create({
      component: LoginPage,
    });
    await modalLogin.present();
  }
}
