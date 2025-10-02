type Valor = number | string | boolean;

function promedio(valores: Valor[], validacion: (valor: Valor) => boolean): number {
    const total = valores.length
    const cantidad = valores.filter((v) => validacion(v)).length
    return Number(((cantidad / total) * 100).toFixed(2));
}

export default function (valores: Valor[][], validacion: (valor: Valor) => boolean): number {
    if (valores.length == 1) {
        return promedio(valores[0], validacion)
    }
    const totales: number[] = valores.reduce((acc: number[], vs: Valor[]) => {
        acc.push(promedio(vs, validacion))
        return acc;
    }, []);
    const sum = totales.reduce((a, b) => a + b, 0);
    return Number((sum / totales.length).toFixed(2));
}
