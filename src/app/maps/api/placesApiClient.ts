import { HttpClient, HttpHandler, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class PlacesApiClient extends HttpClient{
    //creacion de un HttpClient personalizado para concatener la url 
    public baseUrl: string ='https://api.mapbox.com/geocoding/v5/mapbox.places'

    constructor( handler: HttpHandler){
        super(handler);
    }

    //Contruccion de una metodo get generico 
    public override get<T>( url:string, options:{
        //creacion de Http personalizado
        params?: HttpParams | {
            [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
        };
    } ){
        //la base del url y se le concatena el resto de la url con ayuda del HttpHandler
        url = this.baseUrl + url ;
        //llamado de la url de forma generica
        return super.get<T>( url,{
            //parametros o condiciones para la entrega de la informacion por parte de la Api de Mapbox
            params:{
                limit: 5,
                language:'es',
                access_token: environment.mapboxkey,
                ...options.params
            }
        });
    }
}