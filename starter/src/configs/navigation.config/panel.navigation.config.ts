import { DASHBOARDS_PREFIX_PATH } from '@/constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE,
} from '@/constants/navigation.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'
import { useEffect, useState } from 'react'
import enagerd from './enagerd'
import visoresGeo from './visores-geo'

export const panelNavigationFull: NavigationTree[] = [
    {
        key: 'dashboard',
        path: '/dashboard',
        title: 'Inicio',
        translateKey: 'inicio',
        icon: 'dashboard',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'gestion-procesos',
        path: '/gestion-procesos',
        title: 'GESTIÓN DE PROCESOS',
        translateKey: 'nav.gestionProcesos',
        icon: 'file',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'gestionProcesos.lluvias',
                path: '/gestion-procesos',
                title: 'LLUVIAS',
                translateKey: 'nav.gestionProcesos.lluvias',
                icon: 'file',
                type: NAV_ITEM_TYPE_TITLE,
                authority: [],
                subMenu: []
            },
            {
                key: 'gestionProcesos.lluviasAvisoMeteorologico',
                path: '/gestion-procesos/lluviasAvisoMeteorologico',
                title: 'METEOROLÓGICO',
                tooltip: 'Lluvias Aviso Meteorológico',
                translateKey: 'nav.gestionProcesos.lluviasAvisoMeteorologico',
                icon: '',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [
                    {
                        key: 'gestionProcesos.lluviasAvisoMeteorologico.estatico',
                        path: '/gestion-procesos/lluviasAvisoMeteorologico/estatico',
                        title: 'Modelo Estático',
                        translateKey: 'nav.gestionProcesos.lluviasAvisoMeteorologico.estatico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'gestionProcesos.lluviasAvisoMeteorologico.dinamico',
                        path: '/gestion-procesos/lluviasAvisoMeteorologico/dinamico',
                        title: 'Modelo Dinámico',
                        translateKey: 'nav.gestionProcesos.lluviasAvisoMeteorologico.dinamico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    }
                ],
            },
            {
                key: 'gestionProcesos.lluviasAvisoTrimestral',
                path: '/gestion-procesos/lluviasAvisoTrimestral',
                title: 'TRIMESTRAL',
                tooltip: 'Lluvias Aviso Trimestral',
                translateKey: 'nav.gestionProcesos.lluviasAvisoTrimestral',
                icon: '',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [
                    {
                        key: 'gestionProcesos.lluviasAvisoTrimestral.estatico',
                        path: '/gestion-procesos/lluviasAvisoTrimestral/estatico',
                        title: 'Modelo Estático',
                        translateKey: 'nav.gestionProcesos.lluviasAvisoTrimestral.estatico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],

                    },
                    {
                        key: 'gestionProcesos.lluviasAvisoTrimestral.dinamico',
                        path: '/gestion-procesos/lluviasAvisoTrimestral/dinamico',
                        title: 'Modelo Dinámico',
                        translateKey: 'nav.gestionProcesos.lluviasAvisoTrimestral.dinamico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],

                    }
                ],
            },
            {
                key: 'gestionProcesos.lluviasInformacionClimatica',
                path: '/gestion-procesos/lluviasInformacionClimatica',
                title: 'CLIMÁTICA',
                tooltip: 'Lluvias Información Climática',
                translateKey: 'nav.gestionProcesos.lluviasInformacionClimatica',
                icon: '',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [
                    {
                        key: 'gestionProcesos.lluviasInformacionClimatica.estatico',
                        path: '/gestion-procesos/lluviasInformacionClimatica/estatico',
                        title: 'Modelo Estático',
                        translateKey: 'nav.gestionProcesos.lluviasInformacionClimatica.estatico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'gestionProcesos.lluviasInformacionClimatica.dinamico',
                        path: '/gestion-procesos/lluviasInformacionClimatica/dinamico',
                        title: 'Modelo Dinámico',
                        translateKey: 'nav.gestionProcesos.lluviasInformacionClimatica.dinamico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    }
                ],
            },
            {
                key: 'gestionProcesos.bajasTemp',
                path: '/gestion-procesos',
                title: 'BAJAS TEMPERATURAS',
                translateKey: 'nav.gestionProcesos.bajasTemp',
                icon: 'file',
                type: NAV_ITEM_TYPE_TITLE,
                authority: [],
                subMenu: []
            },
            {
                key: 'gestionProcesos.bajasTempAvisoMeteorologico',
                path: '/gestion-procesos/bajasTempAvisoMeteorologico',
                title: 'METEOROLÓGICO',
                tooltip: 'Bajas Temp Aviso Meteorológico',
                translateKey: 'nav.gestionProcesos.bajasTempAvisoMeteorologico',
                icon: '',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [
                    {
                        key: 'gestionProcesos.bajasTempAvisoMeteorologico.estatico',
                        path: '/gestion-procesos/bajasTempAvisoMeteorologico/estatico',
                        title: 'Modelo Estático',
                        translateKey: 'nav.gestionProcesos.bajasTempAvisoMeteorologico.estatico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'gestionProcesos.bajasTempAvisoMeteorologico.dinamico',
                        path: '/gestion-procesos/bajasTempAvisoMeteorologico/dinamico',
                        title: 'Modelo Dinámico',
                        translateKey: 'nav.gestionProcesos.bajasTempAvisoMeteorologico.dinamico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    }
                ],
            },
            {
                key: 'gestionProcesos.bajasTempAvisoTrimestral',
                path: '/gestion-procesos/bajasTempAvisoTrimestral',
                title: 'TRIMESTRAL',
                tooltip: 'Bajas Temp Aviso Trimestral',
                translateKey: 'nav.gestionProcesos.bajasTempAvisoTrimestral',
                icon: '',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [
                    {
                        key: 'gestionProcesos.bajasTempAvisoTrimestral.estatico',
                        path: '/gestion-procesos/bajasTempAvisoTrimestral/estatico',
                        title: 'Modelo Estático',
                        translateKey: 'nav.gestionProcesos.bajasTempAvisoTrimestral.estatico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'gestionProcesos.bajasTempAvisoTrimestral.dinamico',
                        path: '/gestion-procesos/bajasTempAvisoTrimestral/dinamico',
                        title: 'Modelo Dinámico',
                        translateKey: 'nav.gestionProcesos.bajasTempAvisoTrimestral.dinamico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },

                ],
            },
            {
                key: 'gestionProcesos.bajasTempInformacionClimatica',
                path: '/gestion-procesos/bajasTempInformacionClimatica',
                title: 'CLIMÁTICA',
                tooltip: 'Bajas Temp Información Climática',
                translateKey:
                    'nav.gestionProcesos.bajasTempInformacionClimatica',
                icon: '',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [
                    {
                        key: 'gestionProcesos.bajasTempInformacionClimatica.estatico',
                        path: '/gestion-procesos/bajasTempInformacionClimatica/estatico',
                        title: 'Modelo Estático',
                        translateKey: 'nav.gestionProcesos.bajasTempInformacionClimatica.estatico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'gestionProcesos.bajasTempInformacionClimatica.dinamico',
                        path: '/gestion-procesos/bajasTempInformacionClimatica/dinamico',
                        title: 'Modelo Dinámico',
                        translateKey: 'nav.gestionProcesos.bajasTempInformacionClimatica.dinamico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    }
                ],
            },
            {
                key: 'gestionProcesos.incendios',
                path: '/gestion-procesos',
                title: 'INCENDIOS',
                translateKey: 'nav.gestionProcesos.incendios',
                icon: 'file',
                type: NAV_ITEM_TYPE_TITLE,
                authority: [],
                subMenu: []
            },
            {
                key: 'gestionProcesos.incendiosForestalesNacional',
                path: '/gestion-procesos/incendiosForestalesNacional',
                title: 'F. NACIONALES',
                tooltip: 'Incendios Forestales Nacionales',
                translateKey: 'nav.gestionProcesos.incendiosForestalesNacional',
                icon: '',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [
                    {
                        key: 'gestionProcesos.incendiosForestalesNacional.estatico',
                        path: '/gestion-procesos/incendiosForestalesNacional/estatico',
                        title: 'Modelo Estático',
                        translateKey: 'nav.gestionProcesos.incendiosForestalesNacional.estatico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'gestionProcesos.incendiosForestalesNacional.dinamico',
                        path: '/gestion-procesos/incendiosForestalesNacional/dinamico',
                        title: 'Modelo Dinámico',
                        translateKey: 'nav.gestionProcesos.incendiosForestalesNacional.dinamico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },

                ],
            },
            {
                key: 'gestionProcesos.incendiosForestalesRegional',
                path: '/gestion-procesos/incendiosForestalesRegional',
                title: 'F. REGIONALES',
                tooltip: 'Incendios Forestales Regionales',
                translateKey: 'nav.gestionProcesos.incendiosForestalesRegional',
                icon: '',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [
                    {
                        key: 'gestionProcesos.incendiosForestalesRegional.estatico',
                        path: '/gestion-procesos/incendiosForestalesRegional/estatico',
                        title: 'Modelo Estático',
                        translateKey: 'nav.gestionProcesos.incendiosForestalesRegional.estatico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'gestionProcesos.incendiosForestalesRegional.dinamico',
                        path: '/gestion-procesos/incendiosForestalesRegional/dinamico',
                        title: 'Modelo Dinámico',
                        translateKey: 'nav.gestionProcesos.incendiosForestalesRegional.dinamico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    }
                ],
            },
            {
                key: 'gestionProcesos.sismos',
                path: '/gestion-procesos',
                title: 'SISMOS',
                translateKey: 'nav.gestionProcesos.sismos',
                icon: 'file',
                type: NAV_ITEM_TYPE_TITLE,
                authority: [],
                subMenu: []
            },
            {
                key: 'gestionProcesos.sismosTsunamiNacional',
                path: '/gestion-procesos/sismosTsunamiNacional',
                title: 'TSUNAMI',
                tooltip: 'Sismos Tsunami Nacionales',
                translateKey: 'nav.gestionProcesos.sismosTsunamiNacional',
                icon: '',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [
                    {
                        key: 'gestionProcesos.sismosTsunamiNacional.estatico',
                        path: '/gestion-procesos/sismosTsunamiNacional/estatico',
                        title: 'Modelo Estático',
                        translateKey: 'nav.gestionProcesos.sismosTsunamiNacional.estatico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'gestionProcesos.sismosTsunamiNacional.dinamico',
                        path: '/gestion-procesos/sismosTsunamiNacional/dinamico',
                        title: 'Modelo Dinámico',
                        translateKey: 'nav.gestionProcesos.sismosTsunamiNacional.dinamico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    }
                ],
            },
        ],
    },
    {
        key: 'difat',
        path: '/fortalecimiento',
        title: 'FORTALECIMIENTO Y ASISTENCIA TÉCNICA',
        translateKey: 'nav.dimse',
        icon: 'chart',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'fortalecimiento.resumenInstrumentoNivNac.planes',
                path: '/fortalecimiento/resumenInstrumentoNivNac.planes',
                title: 'PLANES',
                tooltip: 'Instrumentos a Nivel Nacional',
                translateKey: 'nav.fortalecimiento.resumenInstrumentoNivNac.planes',
                icon: '',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [
                    {
                        key: 'fortalecimiento.fortCapCursosBasYEspec',
                        path: '/fortalecimiento/fortCapCursosBasYEspec',
                        title: 'PPRRD-RA',
                        tooltip: 'PPRRD por Regiones y Años',
                        translateKey: 'nav.fortalecimiento.fortCapCursosBasYEspec',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'fortalecimiento.pprdNivelNacional',
                        path: '/fortalecimiento/pprdNivelNacional',
                        title: 'PPRRD-EA',
                        tooltip: 'PPRRD - Entidades Asistidas',
                        translateKey: 'nav.fortalecimiento.pprdNivelNacional',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'fortalecimiento.fortCapYAmbitos',
                        path: '/fortalecimiento/fortCapYAmbitos',
                        title: 'PAA',
                        tooltip: 'Programa Anual de Actividades',
                        translateKey: 'nav.fortalecimiento.fortCapYAmbitos',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'fortalecimiento.riesgoPorFenNaturales',
                        path: '/fortalecimiento/riesgoPorFenNaturales',
                        title: 'PEC',
                        tooltip: 'Plan Educación Comunitaria - REP',
                        translateKey: 'nav.fortalecimiento.riesgoPorFenNaturales',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'fortalecimiento.riesgoPorFenNaturales.reaspob',
                        path: '/fortalecimiento/riesgoPorFenNaturales/reaspob',
                        title: 'REAS-POB',
                        tooltip: 'Reasentamiento Poblacional',
                        translateKey: 'nav.fortalecimiento.riesgoPorFenNaturales.reaspob',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'fortalecimiento.otrasAsistenciasTecNacional',
                        path: '/fortalecimiento/otrasAsistenciasTecNacional',
                        title: 'OTROS',
                        tooltip: 'Otros',
                        translateKey: 'nav.fortalecimiento.otrasAsistenciasTecNacional',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'fortalecimiento.riesgoPorFenNaturales.actrepre',
                        path: '/fortalecimiento/riesgoPorFenNaturales/actrepre',
                        title: 'ACT. REPRE.',
                        tooltip: 'Actividad representación',
                        translateKey: 'nav.fortalecimiento.riesgoPorFenNaturales.actrepre',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                ],
            },
            {
                key: 'fortalecimiento.resumenInstrumentoNivNac.instrumentos',
                path: '/fortalecimiento/resumenInstrumentoNivNac/instrumentos',
                title: 'INSTRUMENTOS',
                tooltip: 'Instrumentos a Nivel Nacional',
                translateKey: 'nav.fortalecimiento.resumenInstrumentoNivNac.instrumentos',
                icon: '',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [
                    {
                        key: "fortalecimiento.instrumento.pdc",
                        translateKey: "nav.fortalecimiento.instrumento.pdc",
                        title: "PDC",
                        path: '/fortalecimiento/instrumentos/pdc',
                        icon: "",
                        type: NAV_ITEM_TYPE_ITEM,
                        tooltip: 'Plan de Desarrollo Concertado',
                        authority: [],
                        subMenu: []
                    },
                    {
                        key: "fortalecimiento.instrumento.pdrc",
                        translateKey: "nav.fortalecimiento.instrumento.pdrc",
                        title: "PDRC",
                        path: '/fortalecimiento/instrumentos/pdrc',
                        icon: "",
                        type: NAV_ITEM_TYPE_ITEM,
                        tooltip: 'Plan de Desarrollo Regional Concertado',
                        authority: [],
                        subMenu: []
                    },
                    {
                        key: "fortalecimiento.instrumento.pdlc",
                        translateKey: "nav.fortalecimiento.instrumento.pdlc",
                        title: "PDLC",
                        path: '/fortalecimiento/instrumentos/pdlc',
                        icon: "",
                        type: NAV_ITEM_TYPE_ITEM,
                        tooltip: 'Plan de Desarrollo Local Concertado',
                        authority: [],
                        subMenu: []
                    },
                    {
                        key: "fortalecimiento.instrumento.poi",
                        translateKey: "nav.fortalecimiento.instrumento.poi",
                        title: "POI",
                        path: '/fortalecimiento/instrumentos/poi',
                        icon: "",
                        type: NAV_ITEM_TYPE_ITEM,
                        tooltip: 'Plan Operativo Institucional',
                        authority: [],
                        subMenu: []
                    },
                    {
                        key: "fortalecimiento.instrumento.pei",
                        translateKey: "nav.fortalecimiento.instrumento.pei",
                        title: "PEI",
                        path: '/fortalecimiento/instrumentos/pei',
                        icon: "",
                        type: NAV_ITEM_TYPE_ITEM,
                        tooltip: 'Plan Estratégico Institucional',
                        authority: [],
                        subMenu: []
                    },
                    {
                        key: "fortalecimiento.instrumento.rof",
                        translateKey: "nav.fortalecimiento.instrumento.rof",
                        title: "ROF",
                        path: '/fortalecimiento/instrumentos/rof',
                        icon: "",
                        type: NAV_ITEM_TYPE_ITEM,
                        tooltip: 'Reglamento de Organizacion y Funciones',
                        authority: [],
                        subMenu: []
                    },
                    {
                        key: "fortalecimiento.instrumento.pdt",
                        translateKey: "nav.fortalecimiento.instrumento.pdt",
                        title: "PDT",
                        path: '/fortalecimiento/instrumentos/pdt',
                        icon: "",
                        type: NAV_ITEM_TYPE_ITEM,
                        tooltip: 'Plan de Ordenamiento Territorial',
                        authority: [],
                        subMenu: []
                    },
                    {
                        key: "fortalecimiento.instrumento.eat",
                        translateKey: "nav.fortalecimiento.instrumento.eat",
                        title: "PAT",
                        path: '/fortalecimiento/instrumentos/eat',
                        icon: "",
                        type: NAV_ITEM_TYPE_ITEM,
                        tooltip: 'Plan de Accion Territorial',
                        authority: [],
                        subMenu: []
                    },
                    {
                        key: "fortalecimiento.instrumento.pdu",
                        translateKey: "nav.fortalecimiento.instrumento.pdu",
                        title: "PDU",
                        path: '/fortalecimiento/instrumentos/pdu',
                        icon: "",
                        type: NAV_ITEM_TYPE_ITEM,
                        tooltip: 'Plan de Desarrollo Distrital / Documento de Desarrollo Disrital',
                        authority: [],
                        subMenu: []
                    }
                ]
            },
            {
                key: 'fortalecimiento.resumenInstrumentoNivNac.fortalecimiento',
                path: '/fortalecimiento/resumenInstrumentoNivNac/fortalecimiento',
                title: 'FORTALECIMIENTO DE CAPACIDADES',
                tooltip: 'Instrumentos a Nivel Nacional',
                translateKey: 'nav.fortalecimiento.resumenInstrumentoNivNac.fortalecimiento',
                icon: '',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [
                    {
                        key: 'fortalecimiento.evaluadoresDeRiesgoAcred',
                        path: '/fortalecimiento/evaluadoresDeRiesgoAcred',
                        title: 'ERR',
                        tooltip: 'Evaluadores de Riesgo por Regiones Años',
                        translateKey: 'nav.fortalecimiento.evaluadoresDeRiesgoAcred',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'fortalecimiento.fasesDelPprdNacional',
                        path: '/fortalecimiento/fasesDelPprdNacional',
                        title: 'ERA',
                        tooltip: 'Evaluadores de Riesgo Acreditados',
                        translateKey: 'nav.fortalecimiento.fasesDelPprdNacional',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'fortalecimiento.concursoBuenasPracticas.cb',
                        path: '/fortalecimiento/concursoBuenasPracticas/cb',
                        title: 'CB',
                        tooltip: 'Cursos básicos',
                        translateKey: 'nav.fortalecimiento.concursoBuenasPracticas.cb',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'fortalecimiento.concursoBuenasPracticas.ce',
                        path: '/fortalecimiento/concursoBuenasPracticas/ce',
                        title: 'CE',
                        tooltip: 'Cursos especializados',
                        translateKey: 'nav.fortalecimiento.concursoBuenasPracticas.ce',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                ]
            },
            {
                key: 'fortalecimiento.resumenInstrumentoNivNac.asistencia',
                path: '/fortalecimiento/resumenInstrumentoNivNac/asistencia',
                title: 'ASISTENCIA TÉCNICA',
                tooltip: 'Instrumentos a Nivel Nacional',
                translateKey: 'nav.fortalecimiento.resumenInstrumentoNivNac.asistencia',
                icon: '',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [
                    {
                        key: 'fortalecimiento.resumenDptoAsistTecFortalec',
                        path: '/fortalecimiento/resumenDptoAsistTecFortalec',
                        title: 'ATFC RA',
                        tooltip: 'Asistencia Técnica y Fortalecimiento de Capacidades por Regiones y Años',
                        translateKey: 'nav.fortalecimiento.resumenDptoAsistTecFortalec',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                ]
            },
            /*
            {
                key: 'fortalecimiento.instrumentosEspecialistasNacional',
                path: '/fortalecimiento/instrumentosEspecialistasNacional',
                title: 'Concurso Buenas Prácticas',
                translateKey:
                    'nav.fortalecimiento.instrumentosEspecialistasNacional',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'fortalecimiento.sesionesEspecPprdNivelNac',
                path: '/fortalecimiento/sesionesEspecPprdNivelNac',
                title: 'Aula Virtual',
                translateKey: 'nav.fortalecimiento.sesionesEspecPprdNivelNac',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'fortalecimiento.entidadesAsistEspPprdNacional',
                path: '/fortalecimiento/entidadesAsistEspPprdNacional',
                title: 'Fases del PPRD Especialista',
                translateKey:
                    'nav.fortalecimiento.entidadesAsistEspPprdNacional',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            */
        ],
    },
    {
        key: 'dimse',
        path: '/monitoreo',
        title: 'MONITOREO, SEGUIMIENTO Y EVALUACIÓN',
        translateKey: 'nav.monitoreo',
        icon: 'monitor',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'monitoreo.monitoreo',
                path: '/monitoreo/monitoreo',
                title: 'Monitoreo',
                translateKey: 'nav.monitoreo.monitoreo',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'monitoreo.seguimiento',
                path: '/monitoreo/seguimiento',
                title: 'Seguimiento',
                translateKey: 'nav.monitoreo.seguimiento',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'monitoreo.supervision',
                path: '/monitoreo/supervision',
                title: 'Supervisión',
                translateKey: 'nav.monitoreo.supervision',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'monitoreo.evaluacion',
                path: '/monitoreo/evaluacion',
                title: 'Evaluación',
                translateKey: 'nav.monitoreo.evaluacion',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'monitoreo.directorioNacional',
                path: '/monitoreo/directorioNacional',
                title: 'Directorio Nacional',
                translateKey: 'nav.monitoreo.directorioNacional',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            enagerd,
        ],
    },

]

function isExternal(path?: string) {
    return !!path && /^(https?:)?\/\//.test(path)
}

// function filterBySegment(nav: NavigationTree[], segment: string): NavigationTree[] {
//     const prefix = `/${segment}`
//     return nav
//         .map(item => {
//             const sub = item.subMenu ? filterBySegment(item.subMenu, segment) : []
//             const matchesSelf = !!item.path && item.path.startsWith(prefix)
//             if (matchesSelf || sub.length > 0) {
//                 return { ...item, subMenu: sub }
//             }
//             return null
//         })
//         .filter(Boolean) as NavigationTree[]
// }

function filterBySegmentFlatten(nav: NavigationTree[], segment: string, inSegment = false): NavigationTree[] {
    const prefix = `/${segment}`
    const out: NavigationTree[] = []

    for (const item of nav) {
        const hasPath = typeof item.path === 'string' && item.path.length > 0
        const startsWithSegment = hasPath && item.path!.startsWith(prefix)
        // Una vez que un ancestro coincide, sus descendientes están "dentro del segmento"
        const hereInSegment = inSegment || !!startsWithSegment

        const children = item.subMenu
            ? filterBySegmentFlatten(item.subMenu, segment, hereInSegment)
            : []

        // Regla de inclusión:
        // - Incluye el item si:
        //   a) su path empieza con el segmento, o
        //   b) es un enlace externo y estamos dentro del segmento (para mantener PDFs/Forms)
        const includeSelf =
            (hasPath && startsWithSegment) ||
            (hasPath && isExternal(item.path) && hereInSegment)

        if (includeSelf) {
            out.push({ ...item, subMenu: children })
        } else if (children.length > 0) {
            // Si el item NO debe mostrarse pero tiene hijos válidos, promocionarlos
            out.push(...children)
        }
        // Si no coincide y no tiene hijos válidos, se descarta
    }

    return out
}

// export function usePanelNavigation(storageKey = 'redirectTo') {
//     const [items, setItems] = useState<NavigationTree[]>(() => {
//         const segment = typeof window !== 'undefined' ? localStorage.getItem(storageKey) || '' : ''
//         if (!segment) return panelNavigationFull
//         const filtered = filterBySegment(panelNavigationFull, segment)
//         return filtered.length ? filtered : panelNavigationFull
//     })

//     useEffect(() => {
//         const recompute = () => {
//             const segment = localStorage.getItem(storageKey) || ''
//             if (!segment) return setItems(panelNavigationFull)
//             const filtered = filterBySegment(panelNavigationFull, segment)
//             setItems(filtered.length ? filtered : panelNavigationFull)
//         }
//         window.addEventListener('storage', recompute)
//         window.addEventListener('redirect-segment-changed', recompute)
//         return () => {
//             window.removeEventListener('storage', recompute)
//             window.removeEventListener('redirect-segment-changed', recompute)
//         }
//     }, [storageKey])

//     return items
// }

export function usePanelNavigation(storageKey = 'redirectTo') {
    const compute = () => {
        const segment =
            typeof window !== 'undefined' ? localStorage.getItem(storageKey) || '' : ''
        if (!segment) return panelNavigationFull
        const filtered = filterBySegmentFlatten(panelNavigationFull, segment)
        return filtered.length ? filtered : []
    }

    const [items, setItems] = useState<NavigationTree[]>(compute)

    useEffect(() => {
        const recompute = () => setItems(compute())
        window.addEventListener('storage', recompute)
        window.addEventListener('redirect-segment-changed', recompute)
        return () => {
            window.removeEventListener('storage', recompute)
            window.removeEventListener('redirect-segment-changed', recompute)
        }
    }, [storageKey])

    return items
}
