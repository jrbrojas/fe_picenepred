export type Pregunta = {
    codigo: string;
    op: string;
    opTitulo: string;
    pregunta: string;
    tipo: "%" | "N";
};
export const preguntas: Pregunta[] = [
    // OP1
    {
        codigo: "P1",
        op: "OP1",
        opTitulo:
            "Mejorar la comprensión del riesgo de desastres para toma decisión",
        pregunta:
            "N° investigaciones aplicadas vinculadas a líneas priorizadas en GRD.",
        tipo: "N",
    },
    {
        codigo: "P2",
        op: "OP1",
        opTitulo:
            "Mejorar la comprensión del riesgo de desastres para toma decisión",
        pregunta:
            "N° planes de desarrollo tecnológico vinculados a líneas priorizadas en GRD.",
        tipo: "N",
    },
    {
        codigo: "P3",
        op: "OP1",
        opTitulo:
            "Mejorar la comprensión del riesgo de desastres para toma decisión",
        pregunta: "N° estudios para establecer el riesgo a nivel territorial.",
        tipo: "N",
    },
    {
        codigo: "P4",
        op: "OP1",
        opTitulo:
            "Mejorar la comprensión del riesgo de desastres para toma decisión",
        pregunta:
            "N° registros administrativos que cumplen con estándares del SINAGERD.",
        tipo: "N",
    },
    {
        codigo: "P5",
        op: "OP1",
        opTitulo:
            "Mejorar la comprensión del riesgo de desastres para toma decisión",
        pregunta: "N° de visitas mensuales realizadas al SINAGERD.",
        tipo: "N",
    },
    {
        codigo: "P6",
        op: "OP1",
        opTitulo:
            "Mejorar la comprensión del riesgo de desastres para toma decisión",
        pregunta: "N° transacciones interoperables en GRD registradas en PIDE.",
        tipo: "N",
    },
    {
        codigo: "P7",
        op: "OP1",
        opTitulo:
            "Mejorar la comprensión del riesgo de desastres para toma decisión",
        pregunta: "Índice de vigilancia de peligros por tipo de peligros.",
        tipo: "%", // índice -> lo tratamos como porcentaje
    },
    {
        codigo: "P8",
        op: "OP1",
        opTitulo:
            "Mejorar la comprensión del riesgo de desastres para toma decisión",
        pregunta:
            "N° personas que acceden oportunamente al conocimiento sobre GRD a través de programas de educación y medios masivos.",
        tipo: "N",
    },

    // OP2
    {
        codigo: "P9",
        op: "OP2",
        opTitulo:
            "Mejorar condiciones de ocupación y uso considerando el riesgo de desastres",
        pregunta:
            "% de gobiernos regionales (en los 3 niveles de gobierno) que incorporan GRD en instrumentos de planificación y gestión territorial.",
        tipo: "%",
    },
    {
        codigo: "P10",
        op: "OP2",
        opTitulo:
            "Mejorar condiciones de ocupación y uso considerando el riesgo de desastres",
        pregunta:
            "% de gobiernos regionales (en los 3 niveles de gobierno) capacitados en procedimientos de cumplimiento de normas de edificación, seguridad, control y supervisión.",
        tipo: "%",
    },
    {
        codigo: "P11",
        op: "OP2",
        opTitulo:
            "Mejorar condiciones de ocupación y uso considerando el riesgo de desastres",
        pregunta:
            "% de gobiernos regionales (en los 3 niveles de gobierno) que implementan el programa de fiscalización y supervisión de edificaciones.",
        tipo: "%",
    },
    {
        codigo: "P12",
        op: "OP2",
        opTitulo:
            "Mejorar condiciones de ocupación y uso considerando el riesgo de desastres",
        pregunta:
            "% de instituciones educativas en zonas altamente expuestas a peligro con mayores niveles de seguridad en los 3 niveles de gobierno.",
        tipo: "%",
    },
    {
        codigo: "P13",
        op: "OP2",
        opTitulo:
            "Mejorar condiciones de ocupación y uso considerando el riesgo de desastres",
        pregunta:
            "% de establecimientos de salud en zonas altamente expuestas a  peligro con mayores niveles de seguridad en los 3 niveles de gobierno.",
        tipo: "%",
    },
    {
        codigo: "P14",
        op: "OP2",
        opTitulo:
            "Mejorar condiciones de ocupación y uso considerando el riesgo de desastres",
        pregunta:
            "% de infraestructura de red vial nacional en zonas altamente expuestas a peligro con mayores niveles de seguridad en los 3 niveles de gobierno.",
        tipo: "%",
    },
    {
        codigo: "P15",
        op: "OP2",
        opTitulo:
            "Mejorar condiciones de ocupación y uso considerando el riesgo de desastres",
        pregunta:
            "% de redes de saneamiento en zonas altamente expuestas a peligro con mayores niveles de seguridad en los 3 niveles de gobierno.",
        tipo: "%",
    },
    {
        codigo: "P16",
        op: "OP2",
        opTitulo:
            "Mejorar condiciones de ocupación y uso considerando el riesgo de desastres",
        pregunta:
            "% de edificaciones de vivienda con condiciones mínimas de seguridad física en zonas de alta exposición a peligros en los 3 niveles de gobierno.",
        tipo: "%",
    },
    {
        codigo: "P17",
        op: "OP2",
        opTitulo:
            "Mejorar condiciones de ocupación y uso considerando el riesgo de desastres",
        pregunta:
            "N° de zonas críticas ante lluvias intensas y peligros asociados con medidas estructurales y no estructurales ejecutadas en los 3 niveles de gobierno.",
        tipo: "N",
    },
    {
        codigo: "P18",
        op: "OP2",
        opTitulo:
            "Mejorar condiciones de ocupación y uso considerando el riesgo de desastres",
        pregunta:
            "% de programas del Estado de actividades productivas y económicas que incorporan GRD en zonas de alta y muy alta exposición al peligro en los 3 niveles de gobierno",
        tipo: "%",
    },

    // OP3
    {
        codigo: "P19",
        op: "OP3",
        opTitulo:
            "Mejorar la implementación articulada de GRD en entidades de tres niveles de gobierno",
        pregunta:
            "% de entidades de tres niveles de gobierno que cuentan con planes institucionales que incorporan GRD, desarrollados y validados. en los 3 niveles de gobierno",
        tipo: "%",
    },
    {
        codigo: "P20",
        op: "OP3",
        opTitulo:
            "Mejorar la implementación articulada de GRD en entidades de tres niveles de gobierno",
        pregunta: "N° de funcionarios con competencias mínimas para la GRD en los 3 niveles de gobierno en los 3 niveles de gobierno",
        tipo: "N",
    },
    {
        codigo: "P21",
        op: "OP3",
        opTitulo:
            "% de entidades del Estado que implementan su Plan de Continuidad Operativa en los 3 niveles de gobierno en los 3 niveles de gobierno",
        pregunta:
            "% de entidades del Estado que implementan su Plan de Continuidad Operativa.",
        tipo: "%",
    },
    {
        codigo: "P22",
        op: "OP3",
        opTitulo:
            "Mejorar la implementación articulada de GRD en entidades de tres niveles de gobierno",
        pregunta:
            "% de entidades que formulan información operativa en GRD de acuerdo a sus competencias en los 3 niveles de gobierno.",
        tipo: "%",
    },

    // OP4
    {
        codigo: "P23",
        op: "OP4",
        opTitulo:
            "Implementar mecanismos para incorporar GRD en inversiones públicas, público-privadas y privadas",
        pregunta:
            "% de entidades integrantes del SINAGERD que han recibido capacitación y/o asistencia técnica en los 3 niveles de gobierno.",
        tipo: "%",
    },
    {
        codigo: "P24",
        op: "OP4",
        opTitulo:
            "Implementar mecanismos para incorporar GRD en inversiones públicas, público-privadas y privadas",
        pregunta:
            "% de avance fisico de los proyectos de inversion del PP 0068 en los 3 niveles de gobierno.",
        tipo: "%",
    },
    {
        codigo: "P25",
        op: "OP4",
        opTitulo:
            "Implementar mecanismos para incorporar GRD en inversiones públicas, público-privadas y privadas",
        pregunta:
            "% del Monto coberturado para mecanismos de transferencia de riesgo en los 3 niveles de gobierno.",
        tipo: "%",
    },

    // OP5
    {
        codigo: "P26",
        op: "OP5",
        opTitulo:
            "Asegurar la atención de la población ante la ocurrencia de emergencias y desastres",
        pregunta:
            "% de entidades públicas con capacidad instalada para la atención de emergencias y desastres en los 3 niveles de gobierno.",
        tipo: "%",
    },
    {
        codigo: "P27",
        op: "OP5",
        opTitulo:
            "Asegurar la atención de la población ante la ocurrencia de emergencias y desastres",
        pregunta:
            "% de población damnificada y afectada atendida en sus necesidades de asistencia humanitaria en los 3 niveles de gobierno.",
        tipo: "%",
    },
    {
        codigo: "P28",
        op: "OP5",
        opTitulo:
            "Asegurar la atención de la población ante la ocurrencia de emergencias y desastres",
        pregunta: "N° de sistemas de alerta temprana implementados en los 3 niveles de gobierno.",
        tipo: "N",
    },

    // OP6
    {
        codigo: "P29",
        op: "OP6",
        opTitulo:
            "Mejorar recuperación de población y medios de vida afectados por emergencias y desastres",
        pregunta:
            "% de servicios rehabilitados dentro de los 6 meses de ocurrido el evento en los 3 niveles de gobierno.",
        tipo: "%",
    },
    {
        codigo: "P30",
        op: "OP6",
        opTitulo:
            "Mejorar recuperación de población y medios de vida afectados por emergencias y desastres",
        pregunta: "N° de planes de reconstrucción implementados.",
        tipo: "N",
    },
];

