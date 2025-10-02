// src/components/ResumenTablasApiladas.tsx
import React from 'react'

type DeptRow = {
    departamento: string
    at_entidades: number
    at_aprobados: number
    at_sesiones: number
    fc_basica: number
    fc_especializada: number
    pd_distritos: number
    pd_vigentes: number
    pd_brecha: number
    evar_distritos: number
    evar_entidades: number
    evar_acreditado: number
    actividades_rep: number
}

type PeriodoRow = {
    periodo: string | number
    at_entidades: number
    at_aprobados: number
    at_sesiones: number
    fc_basica: number
    fc_especializada: number
    pd_distritos: number
    pd_vigentes: number
    pd_brecha: number
    evar_distritos: number
    evar_entidades: number
    evar_acreditado: number
    actividades_rep: number
}

// Datos de ejemplo (pon los reales)
const DEPT_ROWS: DeptRow[] = [
    {
        departamento: 'AMAZONAS',
        at_entidades: 60,
        at_aprobados: 7,
        at_sesiones: 295,
        fc_basica: 619,
        fc_especializada: 275,
        pd_distritos: 84,
        pd_vigentes: 5,
        pd_brecha: 79,
        evar_distritos: 84,
        evar_entidades: 10,
        evar_acreditado: 28,
        actividades_rep: 98,
    },
    {
        departamento: 'ANCASH',
        at_entidades: 157,
        at_aprobados: 137,
        at_sesiones: 1295,
        fc_basica: 2115,
        fc_especializada: 1016,
        pd_distritos: 166,
        pd_vigentes: 78,
        pd_brecha: 88,
        evar_distritos: 166,
        evar_entidades: 6,
        evar_acreditado: 89,
        actividades_rep: 15,
    },
    // ...
]

const PERIODO_ROWS: PeriodoRow[] = [
    {
        periodo: 2017,
        at_entidades: 64,
        at_aprobados: 7,
        at_sesiones: 65,
        fc_basica: 772,
        fc_especializada: 653,
        pd_distritos: 1884,
        pd_vigentes: 1,
        pd_brecha: 1877,
        evar_distritos: 1884,
        evar_entidades: 0,
        evar_acreditado: 63,
        actividades_rep: 0,
    },
    {
        periodo: 2018,
        at_entidades: 114,
        at_aprobados: 44,
        at_sesiones: 114,
        fc_basica: 1021,
        fc_especializada: 518,
        pd_distritos: 1884,
        pd_vigentes: 1,
        pd_brecha: 1840,
        evar_distritos: 1884,
        evar_entidades: 0,
        evar_acreditado: 0,
        actividades_rep: 0,
    },
    // ...
]

function TotalesDept(rows: DeptRow): number[] {
    return [
        rows.at_entidades,
        rows.at_aprobados,
        rows.at_sesiones,
        rows.fc_basica,
        rows.fc_especializada,
        rows.pd_distritos,
        rows.pd_vigentes,
        rows.pd_brecha,
        rows.evar_distritos,
        rows.evar_entidades,
        rows.evar_acreditado,
        rows.actividades_rep,
    ]
}

function TotalesDeptGlobal(rows: DeptRow[]) {
    const cols = rows.map(TotalesDept)
    const sums: number[] = Array(cols[0]?.length || 0).fill(0)
    cols.forEach((r) => r.forEach((v, i) => (sums[i] += v)))
    return sums
}

function TotalesPeriodoGlobal(rows: PeriodoRow[]) {
    const sums: number[] = Array(12).fill(0)
    rows.forEach((r) => {
        sums[0] += r.at_entidades
        sums[1] += r.at_aprobados
        sums[2] += r.at_sesiones
        sums[3] += r.fc_basica
        sums[4] += r.fc_especializada
        sums[5] += r.pd_distritos
        sums[6] += r.pd_vigentes
        sums[7] += r.pd_brecha
        sums[8] += r.evar_distritos
        sums[9] += r.evar_entidades
        sums[10] += r.evar_acreditado
        sums[11] += r.actividades_rep
    })
    return sums
}

const HeaderGroup = ({ leftLabel }: { leftLabel: string }) => (
    <thead>
        {/* fila 1: grupos */}
        <tr className="text-white">
            <th
                className="sticky left-0 z-20 bg-[#0097a7] p-3 text-left text-[12px] font-bold uppercase tracking-wide ring-1 ring-white/20"
                rowSpan={2}
            >
                {leftLabel}
            </th>

            {/* Grupos */}
            <th
                colSpan={3}
                className="bg-[#0097a7] p-3 text-[12px] font-bold uppercase tracking-wide ring-1 ring-white/20"
            >
                Asistencia técnica PPRRD
            </th>
            <th
                colSpan={2}
                className="bg-[#0097a7] p-3 text-[12px] font-bold uppercase tracking-wide ring-1 ring-white/20"
            >
                Fortalecimiento de capacidades
            </th>
            <th
                colSpan={3}
                className="bg-[#0097a7] p-3 text-[12px] font-bold uppercase tracking-wide ring-1 ring-white/20"
            >
                PPRRD distritos
            </th>
            <th
                colSpan={2}
                className="bg-[#0097a7] p-3 text-[12px] font-bold uppercase tracking-wide ring-1 ring-white/20"
            >
                EVAR
            </th>
            <th
                rowSpan={1}
                className="bg-[#0097a7] p-3 text-[12px] font-bold uppercase tracking-wide ring-1 ring-white/20"
            >
                EVAR acreditado
            </th>
            <th
                rowSpan={1}
                className="bg-[#0097a7] p-3 text-[12px] font-bold uppercase tracking-wide ring-1 ring-white/20"
            >
                Actividades de representación
            </th>
        </tr>

        {/* fila 2: subencabezados */}
        <tr className="text-[11px] font-semibold text-white">
            <th className="bg-[#0097a7] p-2 ring-1 ring-white/20">
                Entidades asistidas
            </th>
            <th className="bg-[#0097a7] p-2 ring-1 ring-white/20">
                PPRRD aprobados
            </th>
            <th className="bg-[#0097a7] p-2 ring-1 ring-white/20">Sesiones</th>

            <th className="bg-[#0097a7] p-2 ring-1 ring-white/20">
                Formación básica
            </th>
            <th className="bg-[#0097a7] p-2 ring-1 ring-white/20">
                Formación especializada
            </th>

            <th className="bg-[#0097a7] p-2 ring-1 ring-white/20">Distritos</th>
            <th className="bg-[#0097a7] p-2 ring-1 ring-white/20">
                PPRRD vigentes
            </th>
            <th className="bg-[#0097a7] p-2 ring-1 ring-white/20">Brecha</th>

            <th className="bg-[#0097a7] p-2 ring-1 ring-white/20">Distritos</th>
            <th className="bg-[#0097a7] p-2 ring-1 ring-white/20">
                Entidades asistidas
            </th>

            <th className="bg-[#0097a7] p-2 ring-1 ring-white/20">Total</th>
            <th className="bg-[#0097a7] p-2 ring-1 ring-white/20">Total</th>
        </tr>
    </thead>
)

export default function ResumenTablasApiladas() {
    const totalsDept = TotalesDeptGlobal(DEPT_ROWS)
    const totalsPeriodo = TotalesPeriodoGlobal(PERIODO_ROWS)

    return (
        <div className="mx-auto max-w-7xl px-4 py-6 space-y-8">
            {/* TABLA 1: por departamentos */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between px-4 py-3">
                    <h3 className="text-base font-bold text-slate-700">
                        Departamentos
                    </h3>
                    <button
                        type="button"
                        className="rounded-md bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-100"
                    >
                        ⤓ Excel
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-[1200px] table-fixed border-separate border-spacing-0">
                        <HeaderGroup leftLabel="Departamentos" />

                        <tbody>
                            {DEPT_ROWS.map((r) => (
                                <tr
                                    key={r.departamento}
                                    className="even:bg-slate-50/50"
                                >
                                    <td className="sticky left-0 z-10 bg-white p-2 text-[13px] font-semibold text-slate-700 ring-1 ring-slate-200">
                                        {r.departamento}
                                    </td>

                                    {[
                                        r.at_entidades,
                                        r.at_aprobados,
                                        r.at_sesiones,
                                        r.fc_basica,
                                        r.fc_especializada,
                                        r.pd_distritos,
                                        r.pd_vigentes,
                                        r.pd_brecha,
                                        r.evar_distritos,
                                        r.evar_entidades,
                                        r.evar_acreditado,
                                        r.actividades_rep,
                                    ].map((v, i) => (
                                        <td
                                            key={i}
                                            className="p-2 text-center text-[13px] text-slate-700 ring-1 ring-slate-200"
                                        >
                                            {v}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>

                        {/* Totales */}
                        <tfoot>
                            <tr className="bg-slate-100 font-bold text-slate-800">
                                <td className="sticky left-0 z-10 bg-slate-100 p-2 ring-1 ring-slate-200">
                                    TOTALES
                                </td>
                                {totalsDept.map((v, i) => (
                                    <td
                                        key={i}
                                        className="p-2 text-center ring-1 ring-slate-200"
                                    >
                                        {v}
                                    </td>
                                ))}
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </section>

            {/* TABLA 2: por periodos (debajo de la primera) */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between px-4 py-3">
                    <h3 className="text-base font-bold text-slate-700">
                        Periodos
                    </h3>
                    <button
                        type="button"
                        className="rounded-md bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-100"
                    >
                        ⤓ Excel
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-[1200px] table-fixed border-separate border-spacing-0">
                        <HeaderGroup leftLabel="Periodos" />

                        <tbody>
                            {PERIODO_ROWS.map((r) => (
                                <tr
                                    key={r.periodo}
                                    className="even:bg-slate-50/50"
                                >
                                    <td className="sticky left-0 z-10 bg-white p-2 text-[13px] font-semibold text-slate-700 ring-1 ring-slate-200">
                                        {r.periodo}
                                    </td>
                                    {[
                                        r.at_entidades,
                                        r.at_aprobados,
                                        r.at_sesiones,
                                        r.fc_basica,
                                        r.fc_especializada,
                                        r.pd_distritos,
                                        r.pd_vigentes,
                                        r.pd_brecha,
                                        r.evar_distritos,
                                        r.evar_entidades,
                                        r.evar_acreditado,
                                        r.actividades_rep,
                                    ].map((v, i) => (
                                        <td
                                            key={i}
                                            className="p-2 text-center text-[13px] text-slate-700 ring-1 ring-slate-200"
                                        >
                                            {v}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>

                        <tfoot>
                            <tr className="bg-slate-100 font-bold text-slate-800">
                                <td className="sticky left-0 z-10 bg-slate-100 p-2 ring-1 ring-slate-200">
                                    TOTALES
                                </td>
                                {totalsPeriodo.map((v, i) => (
                                    <td
                                        key={i}
                                        className="p-2 text-center ring-1 ring-slate-200"
                                    >
                                        {v}
                                    </td>
                                ))}
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </section>
        </div>
    )
}
