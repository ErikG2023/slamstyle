

export const generatePaginationNumber = (currentPage:number , totalPages:number) =>{

    // SI EL NUMERO TOTAL DE PAGINA ES 7 O MENOS MOSTRAREMOS TODAS LAS PAGINAS SIN LOS "...."

    if (totalPages <= 7) {
        return Array.from({length:totalPages},(_,i)=> i +1);
    }

    // SI LA PAGINA ACTUAL ESTA ENTRE LAS PRIMERAS 3 PAG MOSTRAREMOS LAS PRIMERAS 3 , "...", Y ULTIMAS 2
    if (currentPage <= 3) {
        return [1,2,3,'...',totalPages -1,totalPages];
    }

    // SI LA PAGINA ACTUAL ESTA ENTRE LAS ULTIMAS 3 PAG MOSTRAREMOS PRIMERAS 2 , "..." Y ULTIMAS 3

    if (currentPage >= totalPages - 2) {
        return[1,2,'...',totalPages -2, totalPages -1, totalPages];
    }

    // SI LA PAGINA ACTUAL ESTA EN OTRO LUGAR MEDIO MOSTRAREMOS PRIMERA Pagination, "..." Y ACTUAL

    return [1,'...',currentPage -1 , currentPage , currentPage +1 , '...' , totalPages];
}