import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styleUrls: ['./map-screen.component.css']
})
export class MapScreenComponent {

  //inyeccion del servicio de PlaceServices ../../services
  constructor( private PlacesService: PlacesService) { }

  //creacion de 
  get isUserLocationReady(){
    return this.PlacesService.isUserLocationReady;
  }

}
