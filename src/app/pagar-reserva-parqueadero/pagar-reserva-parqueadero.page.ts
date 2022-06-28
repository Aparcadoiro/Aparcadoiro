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

@Component({
  selector: 'app-pagar-reserva-parqueadero',
  templateUrl: './pagar-reserva-parqueadero.page.html',
  styleUrls: ['./pagar-reserva-parqueadero.page.scss'],
})
export class PagarReservaParqueaderoPage implements OnInit {

  @Input() parqueadero: Parqueadero;
  @Input() reserva: Reserva;
  form: FormGroup;

  constructor(public authSvc: AuthService,
    private modalCtrl: ModalController,
    private reservasService: ReservasService,
    private loadingCtrl: LoadingController,
    private parqueaderosService: ParqueaderosService){}

  ngOnInit() {
    this.initAddReservaForm();
    this.setFormValues();
  }

  //funciona para crear el formulario de las reservas
  initAddReservaForm(){
    this.form = new FormGroup({
      uid: new FormControl(),
      pid: new FormControl(),
      placa: new FormControl(null, [Validators.required]),  
      dia_ingreso: new FormControl(null, [Validators.required]),
      hora_ingreso: new FormControl(null, [Validators.required]),
      hora_salida: new FormControl(null, [Validators.required]),
      confirmParqueadero: new FormControl(null, [Validators.requiredTrue]),
      confirmUser: new FormControl(null, [Validators.required]),
      estado: new FormControl(null, [Validators.required]),
    });
  }

  setFormValues(){
    this.form.setValue({
      uid: this.reserva.uid,
      pid: this.reserva.pid,
      placa: this.reserva.placa,
      dia_ingreso: this.reserva.dia_ingreso,
      hora_ingreso: this.reserva.hora_ingreso,
      hora_salida: this.reserva.hora_salida,
      confirmParqueadero: this.reserva.confirmParqueadero,
      confirmUser: this.reserva.confirmUser,
      estado: this.reserva.estado
    });

    this.form.updateValueAndValidity();
  }

  async submitReserva(){
    

    const loading = await this.loadingCtrl.create({ message: 'Cargando...' });
    loading.present();

    let response: Observable<Reserva>;

    response = this.reservasService.updateReservas(
      this.reserva.id, 
      this.form.value
    );

    response.pipe(take(1)).subscribe((reserva) => {

      if (this.reserva.confirmParqueadero == true && this.reserva.confirmUser == true){
        let sumCupos = { 
          ...this.parqueadero, 
          cupos: this.parqueadero.cupos + 1
        }

        sumCupos = {
          ...sumCupos,
          activo: sumCupos.cupos >= 1 ? true : false
        }
        
        this.parqueaderosService.updateParqueadero(this.parqueadero.id, sumCupos).subscribe(() => {
          this.parqueaderosService.getSockets().subscribe(
            resp => {
              console.log(resp)
            })
        })
      }
      loading.dismiss();
      this.closeModal(reserva);
    });

  }

  //cerrar modal
  closeModal(data = null){
    this.modalCtrl.dismiss(data);
  }

}