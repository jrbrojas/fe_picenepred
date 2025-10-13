export function formatDateYYYYMMDD(fecha: Date) {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Agrega un cero si el mes es menor a 10
    const day = String(fecha.getDate()).padStart(2, '0'); // Agrega un cero si el dIa es menor a 10
    return `${year}-${month}-${day}`;
}

