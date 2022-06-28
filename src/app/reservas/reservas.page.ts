import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { ReservasService } from '../service/reservas.service';
import { Reserva } from './reservas.model';
import { User } from '../shared/user.interface';
import { AuthService } from '../service/auth.service';
import { Parqueadero } from '../parqueaderos/parqueaderos.model';
import { ParqueaderosService } from '../service/parqueaderos.service';
import { DetailReservaPage } from '../detail-reserva/detail-reserva.page';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {

  public user$: Observable<User> = this.authSvc.afAuth.user;
  parqueaderos$: Observable<Parqueadero[]>;
  reservas$: Observable<Reserva[]>;

  constructor(
    public authSvc: AuthService,
    private parqueaderosService: ParqueaderosService, 
    private reservasService: ReservasService, 
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({message: 'Cargando...'});
    loading.present();

    this.reservas$ = this.reservasService.getReservas().pipe(
      tap(reserva =>{
        loading.dismiss();
        return reserva;
      })
    );

    this.parqueaderos$ = this.parqueaderosService.getParqueaderos().pipe(
      tap((parqueaderos) => {
        loading.dismiss();
        return parqueaderos;
      })
    );
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  //Funcion para realizar el pago de la reserva
  async openDetailReserva(reserva: Reserva){
    const modal = await this.modalCtrl.create({
      component: DetailReservaPage,
      componentProps: { reserva },
    });

    await modal.present();

    const { data: updatedReserva, role } = await modal.onDidDismiss();
    if (updatedReserva && role === 'edit') {
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

    if (role === 'delete'){
      this.reservas$ = this.reservas$.pipe(
        map((reservas) => {
          reservas.filter((res) => res.id !== updatedReserva.id);
          return reservas;
        })
      );
    }

  }

  //Funcion para realizar la cancelacion de la reserva y eliminarla de la BD
  // async cancelarReserva(){
  //   const loading = await this.loadingCtrl.create({message: 'Cancelando reserva... '});
  //   loading.present();

  //   this.reservasService.
  //     deleteReservas(this.reserva.id)
  //     .pipe(take(1))
  //     .subscribe(() => {
  //       this.closeModal('delete');
  //     }); 
  // }
}
