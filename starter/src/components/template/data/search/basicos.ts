export interface Basico {
    ruta: string;
    titulo: string;
    texto: string;
}
const resultados: Basico[] = [
    {
        ruta: '/monitoreo/monitoreo',
        titulo: 'Monitoreo',
        texto: 'SIMSE > Monitoreo'
    },
    {
        ruta: '/monitoreo/seguimiento',
        titulo: 'Seguimiento',
        texto: 'SIMSE > Seguimiento'
    },
    {
        ruta: '/monitoreo/supervision',
        titulo: 'Supervisión',
        texto: 'SIMSE > Supervisión'
    },
    {
        ruta: '/monitoreo/evaluacion',
        titulo: 'Evaluación',
        texto: 'SIMSE > Evaluación'
    },
    {
        ruta: '/monitoreo/directorioNacional',
        titulo: 'Directorio Nacional GRD',
        texto: 'SIMSE > Directorio Nacional GRD'
    },
]

export default resultados;
