export interface PacienteRequest {
    idTipoDocumento: number;
    numeroDocumento: string;
    nombres: string;
    apellidos: string;
    fechaNacimiento: string;  
    idSexo: number;
    idEstadoCivil: number;
    correo: string;
    password: string
}