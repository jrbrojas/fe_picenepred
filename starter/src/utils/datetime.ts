export function formatDateYYYYMMDD(fecha: Date) {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Agrega un cero si el mes es menor a 10
    const day = String(fecha.getDate()).padStart(2, '0'); // Agrega un cero si el dIa es menor a 10
    return `${year}-${month}-${day}`;
}
export function noHaPasado(fecha: Date) {
    // 'fecha' puede ser un objeto Date o algo que puedas pasar a Date
    const d = new Date(fecha);

    // fecha actual sin hora
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    // fecha objetivo sin hora
    d.setHours(0, 0, 0, 0);

    // Devuelve true si fecha >= hoy (no ha pasado)
    return d >= hoy;
}

