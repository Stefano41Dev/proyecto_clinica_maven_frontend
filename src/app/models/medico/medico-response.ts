import { EspecialidadResponse } from "../especialidad/especialidad-response";

export interface MedicoResponse {
  idMedico: number;
  nombres: string;
  apellidos: string;
  especialidadResponse: EspecialidadResponse;
  numeroColegiatura: string;
  telefono: string;
  correo: string;
  fechaRegistro: string; 
}
