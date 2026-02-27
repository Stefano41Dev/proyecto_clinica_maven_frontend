import { EstadoCivilResponse } from "../estado-civil/estado-civil-response";
import { TipoSexoResponse } from "../sexo/tipo-sexo-response";
import { TipoDocumentoResponse } from "../tipo-documento/tipo-documento-response";

export interface PacienteResponse {
    idPaciente: number;
    tipoDocumentoResponse: TipoDocumentoResponse;
    numeroDocumento: string;
    nombres: string;
    apellidos: string;
    fechaNacimiento: string;  
    fechaRegistro: string;     
    tipoSexoResponse: TipoSexoResponse;
    estadoCivilResponse: EstadoCivilResponse;
    correo: string;
}
