import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Parqueadero } from '../parqueaderos/parqueaderos.model';
import { Reserva } from '../reservas/reservas.model';
import { AuthService } from '../service/auth.service';
import { ReservasService } from '../service/reservas.service';
import { ParqueaderosService } from '../service/parqueaderos.service';
import { User } from '../shared/user.interface';

@Component({
  selector: 'app-add-reserva',
  templateUrl: './add-reserva.page.html',
  styleUrls: ['./add-reserva.page.scss'],
})
export class AddReservaPage implements OnInit {

  public user$: Observable<User> = this.authSvc.afAuth.user;
  @Input() parqueadero: Parqueadero;
  @Input() reserva: Reserva;
  form: FormGroup;

  constructor(public authSvc: AuthService,
    private modalCtrl: ModalController,
    private reservasService: ReservasService,
    //carga de controlladores 
    private loadingCtrl: LoadingController,
    private parqueaderosService: ParqueaderosService){}

  ngOnInit() {
    this.form = new FormGroup({
      placa: new FormControl(null, [Validators.required]),
      dia_ingreso: new FormControl(null, [Validators.required]),
      hora_ingreso: new FormControl(null, [Validators.required]),
      hora_salida: new FormControl(),
      uid: new FormControl(null, [Validators.required]),
      pid: new FormControl(null, [Validators.required]),
      imagenUrlFro: new FormControl(),
      imagenUrlTra: new FormControl(),
      imagenUrlDer: new FormControl(),
      imagenUrlIzq: new FormControl(),
    });
  }

  //cerrar modal
  closeModal(data = null){
    this.modalCtrl.dismiss(data);
  }

  async submitReserva(){

    const loading = await this.loadingCtrl.create({ message: 'Cargando...' });
    loading.present();

    this.reservasService
      .addReservas(this.form.value)
      .pipe(take(1))
      .subscribe((reserva) => {
        console.log(reserva);
        loading.dismiss();



        let restCupos = {
          ...this.parqueadero, 
          cupos: this.parqueadero.cupos - 1,
        }

        restCupos = {
          ...restCupos,
          activo: restCupos.cupos === 0 ? false : true
        }


        this.parqueaderosService.updateParqueadero(this.parqueadero.id, restCupos).subscribe(() => {
          this.parqueaderosService.getSockets().subscribe(
            resp => {
              console.log(resp)
            })
        })
      });

      this.closeModal();
  }

}
