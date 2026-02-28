import { EstadoCitaResponse } from "../estado-cita/estado-cita-response";
import { MedicoResponse } from "../medico/medico-response";
import { PacienteResponse } from "../paciente/paciente-response";

export interface CitaDatosCompletosResponse{
    idCita: number,
    pacienteResponse: PacienteResponse,
    medicoResponse: MedicoResponse,
    fechaProgramada: string,
    hora: string,
    estadoCitaResponse: EstadoCitaResponse,
    motivo: string
}