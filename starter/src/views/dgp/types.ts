export type GetPlantillasResponse = {
  escenario: Escenario,
  plantillas: GroupPlantilla
}

export type PlantillaGroupItem = {
  nivel: string
  total_poblacion: number
  total_vivienda: number
  total_inst_educativa: number
  total_est_salud: number
  total_centro_poblado?: number
  total_distritos?: number
  total_superficie_agricola?: number
  total_vias?: number
  departamentos: string
  departamentos_poblacion?: {
    departamento: string
    total_poblacion: number | string
  }[]
}

export type GroupPlantilla = {
  [key: string]: PlantillaGroupItem[]
}

export type Filter = {
  purchasedProducts?: string
  purchaseChannel?: Array<string>
}

export type PlantillaA = {
  id: number
  escenario_id: number
  formulario_id: number
  tipo: string
  cod_cp: string | null
  cod_ubigeo: string | null
  poblacion: string | null
  vivienda: string | null
  ie: string | null
  is: string | null
  nivel_riesgo: string | null
  nivel_riesgo_agricola: string | null
  nivel_riesgo_pecuario: string | null
  cantidad_cp: string | null
  nivel_susceptibilidad: string | null
  nivel_exposicion_1_mm: string | null
  nivel_exposicion_2_inu: string | null
  nivel_exposicion_3_bt: string | null
  alumnos: string | null
  docentes: string | null
  vias: string | null
  superficie_agricola: string | null
  pob_5: string | null
  pob_60: string | null
  pob_urb: string | null
  pob_rural: string | null
  viv_tipo1: string | null
  viv_tipo2: string | null
  viv_tipo3: string | null
  viv_tipo4: string | null
  viv_tipo5: string | null
  hogares: string | null
  sa_riego: string | null
  sa_secano: string | null
  prod_agropecuarios: string | null
  prod_agropecuarios_65: string | null
  superficie_de_pastos: string | null
  alpacas: string | null
  ovinos: string | null
  vacunos: string | null
  areas_naturales: string | null
  nivel_sequia: string | null
}

export type Escenario = {
  id: string
  formulario_id: string
  fecha_inicio: Date
  fecha_fin: Date
  nombre: string
  subtitulo: string
  titulo_base: string
  aviso: number
  url_base: string
  formulario: Formulario
  mapas: Mapa[]
}

export type Formulario = {
    id: number | string
    nombre: string
    peligro: string
    plantilla: string
}

export type Mapa = {
  id: number | string
  escenario_id: number | string
  tipo: string
  ruta: string
}