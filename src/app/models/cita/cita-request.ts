export interface CitaRequest {
  idPaciente: number;
  idMedico: number;
  fechaProgramada: string; // formato ISO: "2026-02-27"
  hora: string;            // formato "HH:mm:ss"
  idEstadoCita: number;
  motivo: string;
}