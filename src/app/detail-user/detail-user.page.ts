import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AddReservaPage } from '../add-reserva/add-reserva.page';
import { LoginPage } from '../login/login.page';
import { User } from '../shared/user.interface';
import { Parqueadero } from '../parqueaderos/parqueaderos.model';
import { AuthService } from '../service/auth.service';
import { AddReservaPageModule } from '../add-reserva/add-reserva.module';
import { AddParqueaderoPageModule } from '../add-parqueadero/add-parqueadero.module';
import { AddParqueaderoPage } from '../add-parqueadero/add-parqueadero.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail-user.page.html',
  styleUrls: ['./detail-user.page.scss'],
})
export class DetailComponentUser implements OnInit {
  @Input() parqueadero: Parqueadero;

  public user$: Observable<User> = this.authSvc.afAuth.user;

  constructor(
    public authSvc: AuthService,
    private modalCtrl: ModalController,
    private router: Router,
    ) { }

  ngOnInit() { }

  closeModal() {
    this.modalCtrl.dismiss(this.parqueadero);
  }

  async openLoginModal() {
    const modalLogin = await this.modalCtrl.create({
      component: LoginPage,
    });
    await modalLogin.present();
  }

  async openAddReserva() {
    const modal = await this.modalCtrl.create({
      component: AddReservaPage,
      componentProps: { parqueadero: this.parqueadero },
    });
    await modal.present();
  }
  crearRuta(longitud, latitud) {
    localStorage.setItem('lat-parq', latitud)
    localStorage.setItem('lon-parq', longitud)
    this.router.navigate(['/user'])
    .then(() => {
      window.location.reload();
    });
  }
}
