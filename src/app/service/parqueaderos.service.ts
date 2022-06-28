//importaciones de angular HTTP
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Socket } from 'ngx-socket-io';
//importacion de parqueaderos ts 
import { Parqueadero } from '../parqueaderos/parqueaderos.model';

@Injectable({
    providedIn: 'root'
})


export class ParqueaderosService{
    //importacion de laravel (Conexion de laravel MYSQL)
    apiUrl = 'https://serveraparcadoiro.herokuapp.com/api'

    constructor(private http: HttpClient,
        private socket: Socket,
        ){
            this.checkStatus()
        }
    
    get header(){
        return {
            headers: {
            'auth': "ada686d717bf6dba9a81db34f6724bf7"
            }
        }
    }
    
    //metodo get para envio de informacion 
    getParqueaderos(): Observable<Parqueadero[]>{
        return this.http.get<Parqueadero[]>(`${this.apiUrl}/parqueaderos`);
    }
    //añadir parqueaderos 
    addParqueadero(parqueadero: Parqueadero): Observable<Parqueadero> {
        return this.http.post<Parqueadero>(`${this.apiUrl}/parqueaderos`, parqueadero);
    }
    //sistema de actualizacion de parqueaderos 
    updateParqueadero(parqueaderoId: number, parqueadero: Parqueadero): Observable<Parqueadero> {
        return this.http.put<Parqueadero>(
            `${this.apiUrl}/parqueaderos/${parqueaderoId}`, 
            parqueadero
        );
    }

    getSockets(){
        return this.http.get("https://pksserver.herokuapp.com/v1/socket/add-parqueadero/true", this.header)
    }

    checkStatus(){
        this.socket.on('connect', () => {
          
        })
        this.socket.on('disconnect', () => {
          
        })
    }

    listenSocket( evento: string ) {
        return this.socket.fromEvent(evento)
    }  

}