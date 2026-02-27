export interface PageResponse<T> {
    contenido: T[];
    pagina: number;
    tamanioPagina: number;
    totalRegistros: number;
    totalPaginas: number;
}
