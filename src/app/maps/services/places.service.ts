import { Injectable } from '@angular/core';
import { PlacesApiClient } from '../api/placesApiClient';
import { Feature, PlacesResponse } from '../interfaces/places';
import { MapService } from './map.service';
;

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  //recopilar informacion del dispositivo para Latitud y longitud
  public useLocation?: [number,number];
  //carga tipo buleano verdadero, falso 
  public isLoadingPlaces: boolean = false;
  //arreglo que se inicializa de forma basia(carga de lugares)
  public place: Feature[]=[];  
  //metodo get boolean para retornar si o no se puede usar la localizacion 
  get isUserLocationReady():boolean{
    return !!this.useLocation;
  }

  //peticion http Client
  constructor( 
    //peticion Http personalizado
    private placesApi: PlacesApiClient,
    //peticion para llamar los markes que se mostraran a el usuario 
    private mapService: MapService
    ) { }


}
