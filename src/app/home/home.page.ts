//importaciones de angular
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
//importacion del servicio de parqueaderos
import { ParqueaderosService } from '../service/parqueaderos.service';
//importacion parqueaderos ts
import { Parqueadero } from '../parqueaderos/parqueaderos.model';
//importacion del componente de login en login ts
import { LoginPage } from '../login/login.page';
//importacion del componente del register ts 
import { RegisterPage } from '../register/register.page';

//importacion del MAPBOXLG 
import * as Mapboxgl from 'mapbox-gl'
import { DetailhomeComponent } from '../detailhome/detailhome.component';
import { MapService } from '../maps/services/map.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit{
  //llamado de la importacion del mapa 
  mapa: Mapboxgl.Map;
  //observable de parqueaderos 
  parqueaderos$: Observable<Parqueadero[]>;

  //Funcion para definir la variable mapa y usar el componenete
  map: Mapboxgl;
  latitud = 7.0620153
  longitud = -75.0933164
  // marcadores
  parqueaderos = {
    // tipo
    type: 'FeatureCollection',
    // arreglo con los marcadores
    features: [

    ]
  };
  cordenadas = []

  constructor(
    //funciones privadas de parqueaderosService 
    private parqueaderosService: ParqueaderosService, 
    //funcion priavada para el controlador de la carga 
    private loadingCtrl: LoadingController,
    //funcion privada del modelo controller
    private modalCtrl: ModalController,
    private mapService: MapService,
    private geolocation: Geolocation,
    ){this.obtenerCordenadas()}

    obtenerCordenadas() {

      this.geolocation.watchPosition().subscribe((res: any) => {
  
        this.latitud = res.coords.latitude
        this.longitud = res.coords.longitude
  
        this.cordenadas.push([res.coords.longitude, res.coords.latitude])
        console.log(res)
      });
    }  


  //incializacion del ngOnInit
  async ngOnInit(): Promise<void> {

    //Constante para que aparezca un modal mientras cargan los datos de la pagina
    const loading = await this.loadingCtrl.create({ message: 'Cargando...' })
    loading.present();

    //Funcion para traer la informacion de parqueaderos
    this.cargarParqueaderos();
    setTimeout(() => {
      this.map = this.mapService.cargarMapaInicio(this.latitud, this.longitud, this.parqueaderos)
    }, 5000);
    this.cargarmapa();
    loading.dismiss();
    this.parqueaderosService.listenSocket("parking").subscribe(
      response => {
        console.log(response)
        this.cargarParqueaderos()
        this.cargarmapa()
      })
  }

  cargarParqueaderos(){
    this.parqueaderos$ = this.parqueaderosService.getParqueaderos().pipe(
      tap((parqueaderos) => {
        console.log(parqueaderos);
        for (let i = 0; i < parqueaderos.length; i++) {
          let datapar = {
            //tipo
            type: 'Feature',
            geometry: {
              type: 'Point',
              //cordenadas
              coordinates: [parqueaderos[i].Longitud, parqueaderos[i].Latitud]
            },
            // informacion al darle click al marcador
            properties: { 
              direccion: parqueaderos[i].direccion,
              precioxAuto: parqueaderos[i].automoviles,
              precioxMoto: parqueaderos[i].motocicletas,
              precioxBici: parqueaderos[i].bicicletas,
              imagen: parqueaderos[i].imagenUrl,
            }
          }

          this.parqueaderos.features.push(datapar)

        }
        return parqueaderos;
      })
    );
  }
  // cargar ubicacion del usuario
  cargarmapa() {

    setTimeout(() => {

      const marcador2 = document.createElement('div');
      marcador2.className = 'marker2';
      // agregarmos el marcador al mapa
      new Mapboxgl.Marker(marcador2).setLngLat([this.longitud, this.latitud]).addTo(this.map);

      let market2: any = document.getElementsByClassName('marker2')
      setInterval(() => {
        if (market2.length <= 0) {

          //no existe

          const marcador2 = document.createElement('div');
          marcador2.className = 'marker2';
          // agregarmos el marcador al mapa
          new Mapboxgl.Marker(marcador2).setLngLat([this.longitud, this.latitud]).addTo(this.map);

        }
        else {
          //console.log("existe");

          for (let i = 0; i < this.cordenadas.length; i++) {

            let contenedorMapa = document.getElementsByClassName('mapboxgl-canvas-container');
            let market2: any = document.getElementsByClassName('marker2')
            contenedorMapa[0].removeChild(market2[0]);
            let marcador2 = document.createElement('div');
            marcador2.className = 'marker2';
            // agregarmos el marcador al mapa
            new Mapboxgl.Marker(marcador2).setLngLat(this.cordenadas[i]).addTo(this.map);
          }
        }
      }, 4000);

    }, 1000);
  }
  //abrir modal 
  async openDetailModal(parqueadero: Parqueadero) {
    const modal = await this.modalCtrl.create({
      component: DetailhomeComponent,
      componentProps: { parqueadero },
    });
    
    await modal.present();

  }
  
  //opne login modal
  async openLoginModal(){
    const modalLogin = await this.modalCtrl.create({
      component: LoginPage,
      
    });
    
    await modalLogin.present();

    }
    //abrir el registro modal
  async openRegisterModal(){
    const modalRegister = await this.modalCtrl.create({
      component: RegisterPage,
    });
    
    await modalRegister.present();

    }
    

}
