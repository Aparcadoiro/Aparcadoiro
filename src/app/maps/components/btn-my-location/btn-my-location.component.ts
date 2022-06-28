import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css']
})
export class BtnMyLocationComponent {

  constructor(
     //inyectar los servicios de placeService
    private placeService: PlacesService,
    //mandar a llamar el servicio para inyectarlo en el boton
    private mapService: MapService
   
  ) { }

}
