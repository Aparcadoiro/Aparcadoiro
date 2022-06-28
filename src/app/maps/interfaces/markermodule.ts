
export interface ParqueaderoResponse {
    type:        string;
    query:       string[];
    parqueadero:    Parqueadero[];
    attribution: string;
}

export interface Parqueadero {
    id: number;
    cupos : number;
    direccion :string;
    lat : number;
    long: number;
    automoviles : string;
    motocicletas: string;
    bicicletas : string;
    imagenUrl: string;
    activo: boolean;
    uid: string;
    text: string;
    parque_name: string;
    center: number[];
}

