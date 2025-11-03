import { Fragment, useMemo, useState } from 'react'
import { HiChevronRight, HiChevronDown } from 'react-icons/hi'
import Table from '@/components/ui/Table'
const { Tr, Th, Td, THead, TBody } = Table
import { Tooltip } from 'react-tooltip'

type NivelItem = {
  nivel: string
  departamentos: Record<
    string, // DEP
    {
      provincias: Record<
        string, // PROV
        { distritos: Record<string, { pprrd?: number; evar?: number; reas?: number; reas_pob?: number; act_rep?: number }> }
      >
    }
  >
}

export default function TableInstrumentos({ instrumentos, tipo }: { instrumentos: Record<string, NivelItem[]>; tipo: string }) {
  // estado de expansión
  const [openDeps, setOpenDeps] = useState<Set<string>>(new Set())        // e.g., "AREQUIPA"
  const [openProvs, setOpenProvs] = useState<Set<string>>(new Set())      // e.g., "AREQUIPA|AREQUIPA"

  const nivel = useMemo(() => (instrumentos?.[tipo] ?? [])[0] as NivelItem | undefined, [instrumentos, tipo])

  const toggleDep = (dep: string) => {
    setOpenDeps(prev => {
      const next = new Set(prev)
      next.has(dep) ? next.delete(dep) : next.add(dep)
      return next
    })
  }

  const toggleProv = (dep: string, prov: string) => {
    const key = `${dep}|${prov}`
    setOpenProvs(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  if (!nivel) return null

  return (
  <>
    <Tooltip id="dgp-tabla-instrumentos" style={{ zIndex: 3000 }} opacity={1}/>
    <Table className='border border-gray-300' compact>
      <THead className='bg-gray-100'>
        <Tr>
          <Th>DEPARTAMENTO / PROVINCIA / DISTRITO</Th>
          <Th
              data-tooltip-id='dgp-tabla-instrumentos'
              data-tooltip-content='Plan de Prevención y Reducción del Riesgo de Desastres'
          >PPRRD</Th>
          <Th
              data-tooltip-id='dgp-tabla-instrumentos'
              data-tooltip-content='Evaluación de Riesgo'
          >EVAR</Th>
          <Th
              data-tooltip-id='dgp-tabla-instrumentos'
              data-tooltip-content='Reasentamiento Poblacional'
          >REAS</Th>
        </Tr>
      </THead>
      <TBody>
        {Object.entries(nivel.departamentos ?? {}).map(([depName, depObj]) => {
          const depOpen = openDeps.has(depName)
          // totales por departamento (opcional)
          const depTotals = (() => {
            let pprrd = 0, evar = 0, reas = 0
            Object.values(depObj.provincias ?? {}).forEach(p =>
              Object.values(p.distritos ?? {}).forEach(d => {
                pprrd += Number(d.pprrd ?? 0)
                evar  += Number(d.evar  ?? 0)
                reas  += Number(d.reas ?? d.reas_pob ?? d.act_rep ?? 0)
              })
            )
            return { pprrd, evar, reas }
          })()

          return (
            <Fragment key={`dep-${depName}`}>
              {/* Encabezado DEP */}
              <Tr className="bg-teal-50/60 font-semibold text-[#055E70]">
                <Td colSpan={1} className="text-start">
                  <button
                    type="button"
                    onClick={() => toggleDep(depName)}
                    className="inline-flex items-center gap-2"
                    aria-expanded={depOpen}
                    aria-controls={`dep-${depName}-rows`}
                  >
                    {depOpen ? <HiChevronDown /> : <HiChevronRight />}
                    {depName}
                  </button>
                </Td>
                <Td>{depTotals.pprrd}</Td>
                <Td>{depTotals.evar}</Td>
                <Td>{depTotals.reas}</Td>
              </Tr>

              {/* Provincias del DEP (colapsables) */}
              {depOpen &&
                Object.entries(depObj.provincias ?? {}).map(([provName, provObj]) => {
                  const key = `${depName}|${provName}`
                  const provOpen = openProvs.has(key)

                  // totales por PROV (opcional)
                  const provTotals = (() => {
                    let pprrd = 0, evar = 0, reas = 0
                    Object.values(provObj.distritos ?? {}).forEach(d => {
                      pprrd += Number(d.pprrd ?? 0)
                      evar  += Number(d.evar  ?? 0)
                      reas  += Number(d.reas ?? d.reas_pob ?? d.act_rep ?? 0)
                    })
                    return { pprrd, evar, reas }
                  })()

                  return (
                    <Fragment key={`prov-${key}`}>
                      <Tr className="bg-teal-50/40 font-semibold text-gray-800">
                        <Td colSpan={1} className="pl-8">
                          <button
                            type="button"
                            onClick={() => toggleProv(depName, provName)}
                            className="inline-flex items-center gap-2"
                            aria-expanded={provOpen}
                            aria-controls={`prov-${key}-rows`}
                          >
                            {provOpen ? <HiChevronDown /> : <HiChevronRight />}
                            {provName}
                          </button>
                        </Td>
                        <Td>{provTotals.pprrd}</Td>
                        <Td>{provTotals.evar}</Td>
                        <Td>{provTotals.reas}</Td>
                      </Tr>

                      {/* Distritos */}
                      {provOpen &&
                        Object.entries(provObj.distritos ?? {}).map(([distName, val]) => (
                          <Tr key={`dist-${depName}-${provName}-${distName}`} id={`prov-${key}-rows`}>
                            <Td className="pl-14">{distName}</Td>
                            <Td>{Number(val?.pprrd ?? 0)}</Td>
                            <Td>{Number(val?.evar ?? 0)}</Td>
                            <Td>{Number(val?.reas ?? val?.reas_pob ?? val?.act_rep ?? 0)}</Td>
                          </Tr>
                        ))}
                    </Fragment>
                  )
                })}
            </Fragment>
          )
        })}
      </TBody>
    </Table>
  </>
  )
}
