export interface HistorialMedicoResponse {
  idHistorial: number;
  idCita: number;
  fechaConsulta: string;
  diagnostico: string;
  tratamiento: string[];
  observaciones: string[];
}