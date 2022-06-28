import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PagarReservaParqueaderoPage } from '../pagar-reserva-parqueadero/pagar-reserva-parqueadero.page';
import { Parqueadero } from '../parqueaderos/parqueaderos.model';
import { Reserva } from '../reservas/reservas.model';
import { ReservasService } from '../service/reservas.service';

@Component({
  selector: 'app-detail-reserva-parq',
  templateUrl: './detail-reserva-parq.page.html',
  styleUrls: ['./detail-reserva-parq.page.scss'],
})
export class DetailReservaParqPage implements OnInit {

  reservas$: Observable<Reserva[]>;
  parqueaderos$: Observable<Parqueadero[]>;
  @Input() reserva: Reserva;

  constructor(
    private modalCtrl: ModalController,
    private reservasService: ReservasService,
    private loadingCtrl: LoadingController,
  ) { }

  async ngOnInit() {

    this.reservas$ = this.reservasService.getReservas().pipe(
      tap(reserva =>{
        return reserva;
      })
    );
  }

  //cerrar modal
  closeModal(){
    this.modalCtrl.dismiss(this.reserva);
  }

  async openPagoModal(){
    const modal = await this.modalCtrl.create({
      component: PagarReservaParqueaderoPage,
      componentProps: { reserva: this.reserva },
    });

    await modal.present();

    const { data: updatedReserva } = await modal.onDidDismiss();
    if (updatedReserva) {
      this.reserva = updatedReserva;
    }
  }
}