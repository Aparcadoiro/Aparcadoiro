//exportacion de la interface de parqueaderos 
export interface Parqueadero {
    id: number;
    direccion :string;
    Latitud: string;
    Longitud: string;
    automoviles : string;
    motocicletas: string;
    bicicletas : string;
    cupos : number;
    imagenUrl: string;
    activo: boolean;
    uid: string;
}