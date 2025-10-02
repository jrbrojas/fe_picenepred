export type Campagin = {
    id: string
    name: string
    startDate: number
    endDate: number
    budget: number
    leadsGenerated: number
    conversions: number
    conversionRate: number
    status: string
    type: string
    audienceGroup: string[]
}

export type KpiSummaryData = Record<
    string,
    {
        value: number
        growShrink: number
    }
>

export type AdsPerformanceData = {
    campagin: number[]
    email: number[]
    label: string[]
}

export type LeadPerformanceData = {
    categories: string[]
    series: number[]
}

export type GetMarketingDashboardResponse = {
    kpiSummary: KpiSummaryData
    adsPerformance: AdsPerformanceData
    recentCampaign: Campagin[]
    leadPerformance: LeadPerformanceData
}

export interface CategoriaResponse {
    id: number;
    nombre: string;
    created_at: null;
    updated_at: null;
}

export interface MonitoreoResponse {
    id: number;
    entidad_id: string;
    categoria_responsable_id: string;
    ubigeo: string;
    provincia_idprov: string;
    departamento_iddpto: string;
    anio: string;
    que_implementa: string;
    sustento: string;
    n_personas_en_la_instancia: string;
    n_personas_grd: string;
    created_at: Date;
    updated_at: Date;
    entidad: Entidad;
    respuestas: RespuestaElement[];
    departamento: Departamento;
    provincia: Provincia;
    distrito: Distrito;
}
export interface SupervicionResponse {
    id: number;
    entidad_id: string;
    categoria_responsable_id: string;
    ubigeo: string;
    provincia_idprov: string;
    departamento_iddpto: string;
    anio: string;
    que_implementa: string;
    sustento: string;
    n_personas_en_la_instancia: string;
    n_personas_grd: string;
    created_at: Date;
    updated_at: Date;
    entidad: Entidad;
    secciones: RespuestaElement[];
    departamento: Departamento;
    provincia: Provincia;
    distrito: Distrito;
}

export interface Departamento {
    id: number;
    iddpto: string;
    nombre: string;
    capital: string;
    created_at: Date;
    updated_at: Date;
}

export interface Distrito {
    id: number;
    ubigeo: string;
    distrito: string;
    departamento: string;
    provincia: string;
    capital: string;
    iddpto: string;
    idprov: string;
    created_at: Date;
    updated_at: Date;
}

export interface Entidad {
    id: number;
    ubigeo: string;
    nombre: string;
    ruc: null | string;
    direccion: null;
    telefono: null;
    email: null;
    web: null;
    created_at: Date;
    updated_at: Date;
}

export interface Provincia {
    id: number;
    idprov: string;
    nomdpto: string;
    nombre: string;
    created_at: Date;
    updated_at: Date;
}

export interface RespuestaElement {
    id: number;
    monitoreo_entidad_registrada_id: string;
    codigo: string;
    op: Op;
    titulo: string;
    pregunta: string;
    type: Type;
    promedio: string;
    respuesta: RespuestaEnum;
    cantidad_evidencias: string;
    porcentaje: string;
    created_at: Date;
    updated_at: Date;
}

export enum Op {
    Op1 = "OP1",
    Op2 = "OP2",
    Op3 = "OP3",
    Op4 = "OP4",
    Op5 = "OP5",
    Op6 = "OP6",
}

export enum RespuestaEnum {
    No = "no",
    Si = "si",
}

export enum Type {
    Empty = "%",
    N = "N",
}