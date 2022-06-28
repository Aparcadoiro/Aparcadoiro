import { Component } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ParqueaderosPage } from 'src/app/parqueaderos/parqueaderos.page';
import { ReservasPage } from 'src/app/reservas/reservas.page';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent {

  constructor( 
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    public authSvc: AuthService, 
    private router: Router) { }

  // Funcion para abrir el modal con los parqueaderos del usuario
  async openParqueaderosModal() {
    const modalLogin = await this.modalCtrl.create({
      component: ParqueaderosPage,
    });
    await modalLogin.present();
  }

  // Funcion para abrir el modal con las reservas del usuario
  async openReservasModal() {
    const modalLogin = await this.modalCtrl.create({
      component: ReservasPage,
    });
    await modalLogin.present();
  }

  //salir de la sesion 
  async onLogout() {
    try {
      await this.authSvc.logout();
      this.router.navigate(['']);
    } catch (error) {
      console.log(error);
    }
    this.popoverCtrl.dismiss({
      item:""
    });
  }
  
  
}
