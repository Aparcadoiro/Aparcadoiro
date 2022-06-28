import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DetailReservaParqPage } from '../detail-reserva-parq/detail-reserva-parq.page';
import { Parqueadero } from '../parqueaderos/parqueaderos.model';
import { Reserva } from '../reservas/reservas.model';
import { ParqueaderosService } from '../service/parqueaderos.service';
import { ReservasService } from '../service/reservas.service';

@Component({
  selector: 'app-parqueaderos-reservas',
  templateUrl: './parqueaderos-reservas.page.html',
  styleUrls: ['./parqueaderos-reservas.page.scss'],
})
export class ParqueaderosReservasPage implements OnInit {

  reservas$: Observable<Reserva[]>;
  @Input() parqueadero: Parqueadero;
  @Input() reserva: Reserva;


  constructor(
    private reservasService: ReservasService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({message: 'Cargando...'});
    loading.present();

    this.reservas$ = this.reservasService.getReservas().pipe(
      tap(reserva =>{
        loading.dismiss();
        return reserva;
      })
    );

  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  async openDetailReserva(reserva: Reserva){
    const modal = await this.modalCtrl.create({
      component: DetailReservaParqPage,
      componentProps: { reserva },
    });
    
    await modal.present();

    const { data: updatedReserva } = await modal.onDidDismiss();
    if (updatedReserva) {
      this.reservas$ = this.reservas$.pipe(
        map((reservas) => {
          reservas.forEach( (res) => {
            if (res.id === updatedReserva.id){
              res = updatedReserva;
            }
            return res;
          });
          return reservas;
        })
      );
    }
  }

}
