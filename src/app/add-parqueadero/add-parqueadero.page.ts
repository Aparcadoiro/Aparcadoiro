//importacion del nucleo de angular 
import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
//importacion para le formulario, el controlador y los validadores de formularios angular 
import { FormControl, FormGroup, Validators } from '@angular/forms';
//carga de controladores y modales para ionuc angular
import { LoadingController, ModalController } from '@ionic/angular';
//Importacion de los observables para el manejo de opreaciones asincronas
import { Observable } from 'rxjs';
//Importacion de los operadores para observables para la operacion 
import { take } from 'rxjs/operators';
//improtacion de los models de parqueaderos 
import { Parqueadero } from '../parqueaderos/parqueaderos.model';
import { AuthService } from '../service/auth.service';
//importacion de los servicios de parqueaderos 
import { ParqueaderosService } from '../service/parqueaderos.service';
//importacion para el uso de la interfaz de usuario
import { User } from '../shared/user.interface';

@Component({
  selector: 'app-add-parqueadero',
  templateUrl: './add-parqueadero.page.html',
  styleUrls: ['./add-parqueadero.page.scss'],
})
export class AddParqueaderoPage implements OnInit {
  //Variable de parqueadero
  @Input() parqueadero: Parqueadero;


  public user$: Observable<User> = this.authSvc.afAuth.user;
  isEditMode = false;
  form:FormGroup;

  constructor(
    public afs: AngularFirestore,
    
    public authSvc: AuthService,
    //variable privada de parqueaderos Service 
    private parqueaderosService:ParqueaderosService, 
    //carga de controlladores 
    private loadingCtrl: LoadingController,
    // controlador de los modales 
    private modalCtrl: ModalController,

    ) {}

  ngOnInit() {
    
    //iniciacion de los formularios de parqueadero
    this.initAddParqueaderoForm();
    //si parqueadero esta creado, se puede editar su contenido
    if (this.parqueadero){
      this.isEditMode = true;
      this.setFormValues();
    }
  }

  //variables y funciones para esconder los input en los formularios
  ocultar1: boolean = false
  ocultar2: boolean = false
  ocultar3: boolean = false

  showLabelA(){
    this.ocultar1 = !this.ocultar1;
  }

  showLabelM(){
    this.ocultar2 = !this.ocultar2;
  }

  showLabelB(){
    this.ocultar3 = !this.ocultar3;
  }

  //iniciacion para crear parqueaderos con formularios reactivos
  initAddParqueaderoForm(){
    //creacion de los bloques para formularios reactivos 
    this.form = new FormGroup({
      direccion: new FormControl(null, [Validators.required]),
      Latitud : new FormControl(null, [Validators.required]),
      Longitud : new FormControl(null, [Validators.required]),
      automoviles: new FormControl(),
      motocicletas: new FormControl(),
      bicicletas: new FormControl(),
      cupos: new FormControl(null, [Validators.required]),
      imagenUrl: new FormControl(null, [Validators.required]),
      activo: new FormControl(true),
      uid: new FormControl(null, [Validators.required]),
    });
  }

  //creacion de formulario reactivo sobre pormulario estandar en HTLM
  setFormValues(){
    this.form.setValue({
      direccion: this.parqueadero.direccion,
      Latitud : this.parqueadero.Latitud,
      Longitud : this.parqueadero.Longitud,
      automoviles: this.parqueadero.automoviles,
      motocicletas: this.parqueadero.motocicletas,
      bicicletas: this.parqueadero.bicicletas,
      cupos: this.parqueadero.cupos,
      imagenUrl: this.parqueadero.imagenUrl,
      activo: this.parqueadero.activo,
      uid: this.parqueadero.uid,
    });

    this.form.updateValueAndValidity();
  }

  //cerrar modal
  closeModal(data = null){
    this.modalCtrl.dismiss(data);
  }

  //antes de mostrar el parqueadero aparecera el estado de cargando
  async submitParqueadero() {
    this.closeModal();
    const loading = await this.loadingCtrl.create({ message: 'Cargando...' });
    loading.present();

    //limitacion de las variables que puede analizar el Observable 
    let response: Observable<Parqueadero>;

    if (this.isEditMode) {
      response = 
      this.parqueaderosService.updateParqueadero(
        this.parqueadero.id, 
        this.form.value);
    } else {
      response =  this.parqueaderosService
      .addParqueadero(this.form.value);
    }

    //Respuesta de pipe, cuando se realiza la creacion de un parqueadero
    response.pipe(take(1)).subscribe((parqueadero) => {
      this.form.reset();
      console.log(parqueadero);
      loading.dismiss();
      this.parqueaderosService.getSockets().subscribe(
        resp => {
          console.log(resp)
        }
      );

      if (this.isEditMode) {
        this.parqueaderosService.getSockets().subscribe(
          resp => {
            console.log(resp)
          }
        );
        this.closeModal(parqueadero);
      }
    });

  } 

}
