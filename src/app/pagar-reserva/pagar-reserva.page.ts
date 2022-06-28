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
  selector: 'app-pagar-reserva',
  templateUrl: './pagar-reserva.page.html',
  styleUrls: ['./pagar-reserva.page.scss'],
})
export class PagarReservaPage implements OnInit {

  @Input() parqueadero: Parqueadero;
  @Input() reserva: Reserva;
  form: FormGroup;
  mostrarPrecio: boolean = false;
  valor: number;

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
      vehiculo: new FormControl(null, [Validators.required]),
      dia_ingreso: new FormControl(null, [Validators.required]),
      hora_ingreso: new FormControl(null, [Validators.required]),
      hora_salida: new FormControl(null, [Validators.required]),
      confirmUser: new FormControl(null, [Validators.requiredTrue]),
      confirmParqueadero: new FormControl(),
      estado: new FormControl(),
    });
  }

  setFormValues(){
    this.form.setValue({
      placa: this.reserva.placa,
      vehiculo: null,
      dia_ingreso: this.reserva.dia_ingreso,
      hora_ingreso: this.reserva.hora_ingreso,
      hora_salida: this.reserva.hora_salida,
      confirmUser: this.reserva.confirmUser,
      confirmParqueadero: this.reserva.confirmParqueadero,
      uid: this.reserva.uid,
      pid: this.reserva.pid,
      estado: this.reserva.estado
    });

    this.form.updateValueAndValidity();
  }

  realizarCambios(i: Event | any){
    const hora_ingreso: any = this.reserva.hora_ingreso.split(":")
    const hora_salida: any = this.form.get("hora_salida").value.split(":")

    const set_hora_ingreso = new Date(this.reserva.dia_ingreso).setHours(hora_ingreso[0], hora_ingreso[1], 0)
    const set_hora_salida = new Date(this.reserva.dia_ingreso).setHours(hora_salida[0], hora_salida[1], 0)
   
    const momentIngreso = new Date(set_hora_ingreso).toISOString()
    const momentSalida = new Date(set_hora_salida).toISOString()

    let totalHs = (new Date(momentIngreso).getTime() - new Date(momentSalida).getTime()) / 1000

    totalHs /= 3600

    const mapHs = Math.abs(Math.round(totalHs))

    console.log(mapHs)

    const vehiculo = Number(this.form.get("vehiculo").value)

    this.parqueaderosService.getParqueaderos().subscribe((parqueaderos) => {
      const filterParqueadero = parqueaderos.filter((elemento) => elemento.id === Number(this.reserva.pid))
      this.mostrarPrecio = true
      this.valor = vehiculo == 0 ? Number(filterParqueadero[0].automoviles) * mapHs: vehiculo == 1 ? Number(filterParqueadero[0].motocicletas) * mapHs: vehiculo == 2 ? Number(filterParqueadero[0].bicicletas) * mapHs:null
    })
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
      //Traer parqueadero
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

      loading.dismiss();
      this.closeModal(reserva);

    });
  }

  //cerrar modal
  closeModal(data = null){
    this.modalCtrl.dismiss(data);
  }

}
