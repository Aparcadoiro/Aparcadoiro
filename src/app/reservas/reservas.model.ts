export interface Reserva{
    id: number;
    placa: string;
    uid: string;
    pid: number;
    dia_ingreso: string;
    hora_ingreso: string;
    hora_salida: string;
    confirmUser: boolean;
    confirmParqueadero: boolean;
    imagenUrlFro:string;
    imagenUrlTra:string;
    imagenUrlDer:string;
    imagenUrlIzq:string;
    estado: boolean;
}