import { useState, useEffect, useMemo } from 'react'
import debounce from 'lodash/debounce'
import { HiOutlineSearch, HiChevronRight } from 'react-icons/hi'
import { PiMagnifyingGlassDuotone } from 'react-icons/pi'
import Highlighter from 'react-highlight-words'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollBar from '@/components/ui/ScrollBar'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'


// Mock de datos (puedes luego reemplazar con API real)
/*const mockData = [
  {
    nombre: 'Informe de evaluación de riesgos originado por deslizamiento del suelo en el área de influencia de la quebrada El Zanjón',
    tipo_docum: 'EVAR',
    anio: '2021',
    descripcio: 'Determina los niveles de riesgo por deslizamiento de suelo en el área de influencia de la Caseta de bombeo 1, Paita Alta, Piura.',
    autor_corp: 'Municipalidad Provincial de Paita (MP Paita)',
    ambito: 'PIURA - PAITA',
  },
  {
    nombre: 'Informe de evaluación de riesgos por flujos de detritos en el centro poblado Aplao',
    tipo_docum: 'EVAR',
    anio: '2019',
    descripcio: 'Riesgo por flujo de detritos originados por lluvias intensas en Aplao, Arequipa.',
    autor_corp: 'Municipalidad Provincial de Castilla (MP Castilla)',
    ambito: 'AREQUIPA - CASTILLA',
  },
  {
    nombre: 'Evaluación de riesgo por fenómeno sísmico en Cusibamba Bajo, Misca y Limaccpata',
    tipo_docum: 'EVAR',
    anio: '2015',
    descripcio: 'Caracteriza el fenómeno sísmico y escenarios de riesgo en Paruro, Cusco.',
    autor_corp: 'Gobierno Regional del Cusco (GORE CUSCO)',
    ambito: 'CUSCO - PARURO',
  },
]*/
const mockData = [
  {
    nombre: "Informe de evaluación de riesgos originado por deslizamiento del suelo en el área de influencia de la quebrada El Zanjón, en la caseta de Bombeo 1, sector Paita Alta, distrito de Paita, provincia de Paita, departamento de Piura",
    tipo_docum: "EVAR",
    anio: "2021",
    descripcio: "El objetivo del presente informe es determinar los niveles de riesgos por deslizamiento de suelo en el área de influencia de la infraestructura de la Caseta de bombeo 1, en la zona Paita Alta, distrito de Paita, provincia de Paita y departamento de Piura.",
    ambito: "Caseta de Bombeo 1, DISTRITO PAITA, PAITA, PIURA"
  },
  {
    nombre: "Informe de evaluación de riesgos por deslizamiento en el sector Oyón este, distrito de Oyón, provincia de Oyón, departamento de Lima",
    tipo_docum: "EVAR",
    anio: "2021",
    descripcio: "El objetivo del presente informe es determinar los niveles de riesgo en el sector Oyón frente al peligro de movimientos en masa del tipo deslizamiento de sus laderas y taludes en el distrito y provincia de Oyón y departamento de Lima.",
    ambito: "Sector Oyón este, DISTRITO OYON, OYON, LIMA"
  },
  {
    nombre: "Informe de evaluación de riesgos por flujos de detritos originados por lluvias intensas en el centro poblado Aplao, anexos de Casquina y Caspani, distrito de Aplao, provincia de Castilla, departamento de Arequipa",
    tipo_docum: "EVAR",
    anio: "2019",
    descripcio: "El presente estudio tuvo como objetivo determinar el nivel del riesgo por flujo de detritos originados por lluvias intensas en los anexos Casquina, Caspani y Centro Poblado de Aplao, distrito de Aplao, provincia de Castilla y departamento de Arequipa.",
    ambito: "Centro poblado Aplao, anexos de Casquina y Caspani, DISTRITO APLAO, CASTILLA, AREQUIPA"
  },
  {
    nombre: "Informe de evaluación del riesgo originado por inundación fluvial en el sector urbano del centro poblado de Chahuarma, distrito de Lircay, provincia de Angaraes, departamento de Huancavelica",
    tipo_docum: "EVAR",
    anio: "2020",
    descripcio: "El objetivo del estudio fue determinar los niveles de riesgo originado por inundación en el sector urbano del centro poblado de Chahuarma, distrito de Lircay, provincia de Angaraes, departamento de Huancavelica.",
    ambito: "Centro poblado Chahuarma, DISTRITO LIRCAY, ANGARAES, HUANCAVELICA"
  },
  {
    nombre: "Informe de evaluación del riesgo de desastres por caída de suelos en la zona de reglamentación especial ZRESS10 'Chacahuaico', 'Magisterial Uvima Sute V', 'Monterrey' y Urb. 'Copropietarios La Amistad' de San Sebastián, provincia y departamento Cusco",
    tipo_docum: "EVAR",
    anio: "2021",
    descripcio: "El objetivo del presente informe es determinar el nivel de Riesgo por caída de suelos en las A.P.V.s Chacahuaico, Magisterial Uvima Sute V, Monterrey y Urb. Copropietarios La Amistad, perteneciente a la Zona de Reglamentación Especial codificada como ZRESS10, ubicada en el distrito de San Sebastián, provincia y departamento de Cusco.",
    ambito: "ZRESS10 'Chacahuaico', 'Magisterial Uvima Sute V', 'Monterrey' y Urb. 'Copropietarios La Amistad', DISTRITO SAN SEBASTIAN, CUSCO, CUSCO"
  },
  {
    nombre: "Evaluación de riesgos originados por deslizamiento en las A.P.V. Virgen Concepción, Villa Franciscana y San Valentín, distrito de Santiago, provincia y departamento de Cusco",
    tipo_docum: "EVAR",
    anio: "2021",
    descripcio: "El objetivo del presente informe es determinar el nivel de riesgo por deslizamiento en las agrupaciones vecinales Virgen Concepción, Villa Franciscana y San Valentín, del distrito de Santiago, provincia y departamento de Cusco.",
    ambito: "A.P.V. Virgen Concepción, Villa Franciscana y San Valentín, DISTRITO SANTIAGO, CUSCO, CUSCO"
  },
  {
    nombre: "Informe de evaluación del riesgo de desastres por propagación lateral en la zona de reglamentación especial ZRESS15 'APV Lucerinas, Lucerinas Sur, Magisterial Uvima Sut V y Monterrey', distrito de San Sebastián, provincia y departamento Cusco",
    tipo_docum: "EVAR",
    anio: "2021",
    descripcio: "El presente informe tiene por objetivo determinar el nivel de riesgo por propagación lateral en las A.P.V.s Lucerinas, Lucerinas Sur, Magisterial Uvima Sute V y Monterrey, perteneciente a la Zona de Reglamentación Especial codificada como ZRESS15, ubicada en el distrito de San Sebastián, provincia y departamento de Cusco.",
    ambito: "ZRESS15 'APV Lucerinas, Lucerinas Sur, Magisterial Uvima Sute V y Monterrey', DISTRITO SAN SEBASTIAN, CUSCO, CUSCO"
  },
  {
    nombre: "Evaluación de riesgos originados por flujo de detritos en las A.P.V. Virgen Concepción, Villa Franciscana y San Valentín, distrito de Santiago, provincia y departamento de Cusco",
    tipo_docum: "EVAR",
    anio: "2021",
    descripcio: "El objetivo del presente informe es determinar el nivel de riesgo por flujo de detritos en las agrupaciones vecinales Virgen Concepción, Villa Franciscana y San Valentín, del distrito de Santiago, provincia y departamento de Cusco.",
    ambito: "A.P.V. Virgen Concepción, Villa Franciscana y San Valentín, DISTRITO SANTIAGO, CUSCO, CUSCO"
  },
  {
    nombre: "Informe de evaluación de riesgo de inundación originado por el desborde del canal pluvial en el sector urbano del distrito de Sausa, provincia de Jauja, departamento de Junín",
    tipo_docum: "EVAR",
    anio: "2020",
    descripcio: "El estudio determina los niveles de riesgo originado por el desborde del canal pluvial en el sector urbano del distrito de Sausa, provincia de Jauja, departamento de Junín, aplicando la metodología propuesta por el CENEPRED.",
    ambito: "Canal pluvial del sector urbano, DISTRITO SAUSA, JAUJA, JUNIN"
  },
  {
    nombre: "Informe de evaluación de riesgo originado por tsunami en el área delimitada por el sector Huanchaquito Bajo, centro poblado Huanchaquito, distrito Huanchaco, provincia Trujillo, departamento La Libertad",
    tipo_docum: "EVAR",
    anio: "2022",
    descripcio: "El objetivo del presente informe es determinar los niveles de riesgo originado por tsunami en el área delimitada por el sector Huanchaquito Bajo, ubicado en el C.P. de Huanchaquito, del distrito de Huanchaco, en la provincia de Trujillo, departamento La Libertad.",
    ambito: "Sector Huanchaquito Bajo, DISTRITO HUANCHACO, TRUJILLO, LA LIBERTAD"
  }
];
export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [open, setOpen] = useState(false)

  // Función de búsqueda por palabras (no frase exacta)
  const handleSearch = (term: string) => {
    if (!term) {
      setResults([])
      return
    }

    // Separamos la búsqueda por palabras individuales
    const words = term
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 0)

    const filtered = mockData.filter((item) =>
      Object.values(item).some((value) => {
        const text = value.toLowerCase()
        // Todas las palabras deben estar presentes
        return words.every((word) => text.includes(word))
      })
    )

    setResults(filtered)
  }

  // Debounce para evitar búsqueda en cada tecla
  const debouncedSearch = useMemo(() => debounce(handleSearch, 300), [])

  useEffect(() => {
    debouncedSearch(query)
  }, [query])

  return (
    <>
      <Button
        icon={<HiOutlineSearch />}
        className="rounded-full p-2 hover:bg-gray-100"
        onClick={() => setOpen(true)}
      >
        Buscar
      </Button>

      <Dialog isOpen={open} onClose={() => setOpen(false)} width={600}>
        <div className="p-4">
          <div className="flex items-center gap-2 border-b pb-2">
            <PiMagnifyingGlassDuotone className="text-gray-500 text-xl" />
            <input
              type="text"
              placeholder="Buscar informes, distritos, autores..."
              className="flex-1 outline-none bg-transparent text-gray-800"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>

          <ScrollBar className="mt-4 max-h-96">
            <AnimatePresence>
              {results.length > 0 ? (
                results.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="p-3 border-b hover:bg-gray-50 transition cursor-pointer rounded-md"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Highlighter
                          highlightClassName="bg-yellow-200"
                          searchWords={query.trim().split(/\s+/)}
                          autoEscape={true}
                          textToHighlight={item.nombre}
                          className="font-semibold text-gray-800"
                        />
                        <p className="text-sm text-gray-600 mt-1">
                          <Highlighter
                            highlightClassName="bg-yellow-200"
                            searchWords={query.trim().split(/\s+/)}
                            autoEscape={true}
                            textToHighlight={item.descripcio}
                          />
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.ambito} • {item.anio} • {item.autor_corp}
                        </p>
                      </div>
                      <HiChevronRight className="text-gray-400 mt-1" />
                    </div>
                  </motion.div>
                ))
              ) : query ? (
                <p className="text-center text-gray-500 mt-8">
                  No se encontraron resultados.
                </p>
              ) : (
                <p className="text-center text-gray-400 mt-8">
                  Escribe para iniciar la búsqueda
                </p>
              )}
            </AnimatePresence>
          </ScrollBar>
        </div>
      </Dialog>
    </>
  )
}
