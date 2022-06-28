//Importaciones de Angular y Ionic para el uso de interfaces, rutas y funciones
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { error } from 'console';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DetailComponentUser } from '../detail-user/detail-user.page';
import { Parqueadero } from '../parqueaderos/parqueaderos.model';
import { ParqueaderosPage } from '../parqueaderos/parqueaderos.page';
import { AuthService } from '../service/auth.service';
import { ParqueaderosService } from '../service/parqueaderos.service';
import { User } from '../shared/user.interface';
import { environment } from 'src/environments/environment';
import { PopoverComponent } from '../components/popover/popover.component';
//importacion para el uso del mapa
import * as Mapboxgl from 'mapbox-gl'
import { ReservasPage } from '../reservas/reservas.page';
import { MapService } from '../maps/services/map.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';



mapa: Mapboxgl.Map;

//Componentes para usar los archivos de user
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})

//Funcion para exportar la clase VerifyEmailPage
export class UserPage implements OnInit {

  //Funcion para definir la variable user como una variable publica y enlazarla con el modelo User
  public user$: Observable<User> = this.authSvc.afAuth.user;

  //Funcion para definir la variable parqueaderos y enlazarla con el modelo Parqueadero
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
  boton = false
  //Funcion constructor para definir variables de autenticacion, servicios y rutas
  constructor(public authSvc: AuthService, private router: Router,
    private parqueaderosService: ParqueaderosService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    private mapService: MapService,
    private geolocation: Geolocation,
  ) {
    this.obtenerCordenadas()
  }
  obtenerCordenadas() {

    this.geolocation.watchPosition().subscribe((res: any) => {

      this.latitud = res.coords.latitude
      this.longitud = res.coords.longitude

      this.cordenadas.push([res.coords.longitude, res.coords.latitude])
      console.log(res)
    });

  }
  //Funcion para cuando inicia la página
  async ngOnInit(): Promise<void> {
    console.log('cualquier cosa')
    let lat = localStorage.getItem('lat-parq')
    let lon = localStorage.getItem('lon-parq')

    if (lat === null || lon === null) {
      this.boton = false
    } else {
      this.boton = true
    }
    //Constante para que aparezca un modal mientras cargan los datos de la pagina
    const loading = await this.loadingCtrl.create({ message: 'Cargando...' })
    loading.present();

    //Funcion para traer la informacion de parqueaderos
    this.cargarParqueaderos();

    this.parqueaderosService.listenSocket("parking").subscribe(
      response => {
        console.log(response)
        this.cargarParqueaderos()
        this.cargarmapa()
      }
    );
    
    loading.dismiss();

    setTimeout(() => {
      this.map = this.mapService.cargarMapa(this.latitud, this.longitud, this.parqueaderos)
    }, 5000);
    this.cargarmapa();

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
        let lat = localStorage.getItem('lat-parq')
        let lon = localStorage.getItem('lon-parq')

        if (lat === null || lon === null) {

        } else {

          let latiNum = Number(lat)
          let loniNum = Number(lon)

          this.crearRuta(latiNum, loniNum)

        }
      }, 4000);

    }, 1000);
  }
  //Funcion para abrir el modal de detalles de parqueadero
  async openDetailModal(parqueadero: Parqueadero) {
    const modal = await this.modalCtrl.create({
      component: DetailComponentUser,
      componentProps: { parqueadero },
    });
    await modal.present();
  }

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
  }
  //desplegar menu
  async presentPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  //crear ruta
  crearRuta(lat, lon) {

    setTimeout(() => {

      let cordenadasPar = []
      cordenadasPar.push(lon, lat)


      this.mapService.dibujarRuta(this.cordenadas[0], cordenadasPar).subscribe((res: any) => {

        let route = res.routes[0].geometry.coordinates

        this.map.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: route
            }
          }
        })
        this.map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': 'black',
            'line-width': 5
          }
        })
        this.map.fitBounds([route[0], route[route.length - 1]], {
          padding: 50
        })

      })

    }, 1300);
  }
  borrarRuta() {
    localStorage.removeItem('lat-parq')
    localStorage.removeItem('lon-parq')
    this.router.navigate(['/user'])
      .then(() => {
        window.location.reload();
      });
  }
}

