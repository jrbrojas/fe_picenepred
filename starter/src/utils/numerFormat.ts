export default function NumeroFormateado(valor: number | string | undefined) {
    const numero = Number(valor);
    return new Intl.NumberFormat().format(numero);
}