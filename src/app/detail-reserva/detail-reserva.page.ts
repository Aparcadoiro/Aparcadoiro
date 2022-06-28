import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AddReservaPage } from '../add-reserva/add-reserva.page';
import { PagarReservaPage } from '../pagar-reserva/pagar-reserva.page';
import { Parqueadero } from '../parqueaderos/parqueaderos.model';
import { Reserva } from '../reservas/reservas.model';
import { ReservasService } from '../service/reservas.service';
import { ParqueaderosService } from '../service/parqueaderos.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detail-reserva',
  templateUrl: './detail-reserva.page.html',
  styleUrls: ['./detail-reserva.page.scss'],
})
export class DetailReservaPage implements OnInit {

  reservas$: Observable<Reserva[]>;
  parqueaderos$: Observable<Parqueadero[]>;
  @Input() reserva: Reserva;

  constructor(
    private modalCtrl: ModalController,
    private reservasService: ReservasService,
    private loadingCtrl: LoadingController,
    private parqueaderosService: ParqueaderosService,
    public alertController: AlertController) { }

  ngOnInit(){
    
  }

  //cerrar modal
  closeModal(role = 'edit'){
    this.modalCtrl.dismiss(this.reserva, role);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar reserva',
      message: '¿Seguro que deseas eliminar la reserva?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'success',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Cancelar');
          }
        }, 
        {
          text: 'Eliminar',
          cssClass: 'danger',
          id: 'confirm-button',
          handler: () => {
            this.eliminarReserva();
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('Se ha eliminado satisfactoriamente', role);
  }

  async presentAlert2() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cancelar reserva',
      message: '¿Seguro que deseas cancelar la reserva?',
      buttons: [
        {
          text: 'Atrás',
          role: 'cancel',
          cssClass: 'success',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Cancelar');
          }
        }, 
        {
          text: 'Cancelar reserva',
          cssClass: 'danger',
          id: 'confirm-button',
          handler: () => {
            this.onDeleteReserva();
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('Se ha eliminado satisfactoriamente', role);
  }

  async eliminarReserva(){
    const loading = await this.loadingCtrl.create({message: 'Cancelando reserva'})
    loading.present();

    this.reservasService
      .deleteReservas(this.reserva.id)
      .pipe(take(1))
      .subscribe(() => {
        loading.dismiss();
        this.closeModal('delete');

    });
  }

  async onDeleteReserva(){
    const loading = await this.loadingCtrl.create({message: 'Cancelando reserva'})
    loading.present();

    this.reservasService
      .deleteReservas(this.reserva.id)
      .pipe(take(1))
      .subscribe(() => {
        loading.dismiss();
        this.closeModal('delete');

        this.parqueaderosService.getParqueaderos().subscribe((parqueaderos) => {
          const filterParqueadero = parqueaderos.filter((elemento) => elemento.id === Number(this.reserva.pid))
          console.log(filterParqueadero)
          
          let sumCupos = { 
            ...filterParqueadero[0], 
            cupos: filterParqueadero[0].cupos + 1
          }

          sumCupos = {
            ...sumCupos,
            activo: sumCupos.cupos >= 1 ? true : false
          }
          
          this.parqueaderosService.updateParqueadero(filterParqueadero[0].id, sumCupos).subscribe(() => {
            this.parqueaderosService.getSockets().subscribe(
              resp => {
                console.log(resp)
              })
          })
        })



    });
  }

  async openPagoModal(){
    const modal = await this.modalCtrl.create({
      component: PagarReservaPage,
      componentProps: { reserva: this.reserva },
    });

    await modal.present();

    const { data: updatedReserva } = await modal.onDidDismiss();
    if (updatedReserva) {
      this.reserva = updatedReserva;
    }
  }

}
