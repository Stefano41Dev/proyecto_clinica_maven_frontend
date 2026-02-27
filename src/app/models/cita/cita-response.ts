import { EstadoCitaResponse } from "../estado-cita/estado-cita-response";

export interface CitaResponse {
    idCita: number,
    fechaProgramada: string,
    hora: string,
    motivo: string,
    idPaciente: number,
    nombresPaciente: string,
    apellidosPaciente: string,
    idMedico: number,
    nombresMedico: string,
    apellidosMedico: string,
    estadoCitaResponse: EstadoCitaResponse
}
