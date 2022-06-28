import { HttpClient, HttpHandler} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class DirectionsApiClient extends HttpClient{
    //creacion de un HttpClient personalizado para concatenar la url 
    public baseUrl: string ='https://api.mapbox.com/directions/v5/mapbox/driving'

    constructor( handler: HttpHandler){
        super(handler);
    }

    //Contruccion de una metodo get generico 
    public override get<T>( url:string){
        //la base del url y se le concatena el resto de la url con ayuda del HttpHandler
        url = this.baseUrl + url ;
        //llamado de la url de forma generica
        return super.get<T>( url,{
            //parametros o condiciones para la entrega de la informacion por parte de la Api de Mapbox
            params:{
                alternatives: true,
                geometries:'geojson',
                language:'es',
                overview: 'simplified',
                steps: true,
                access_token: environment.mapboxkey
            }
        });
    }
}