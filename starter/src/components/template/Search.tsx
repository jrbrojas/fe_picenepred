import { useState, useRef, useEffect } from 'react'
import classNames from '@/utils/classNames'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import ScrollBar from '@/components/ui/ScrollBar'
import { HiOutlineSearch } from 'react-icons/hi'
import { PiMagnifyingGlassDuotone } from 'react-icons/pi'
import Highlighter from 'react-highlight-words'
import apiGet from '@/services/ApiServiceSearch'

const _Search = ({ className }: { className?: string }) => {
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearchOpen = () => setSearchDialogOpen(true)
  const handleSearchClose = () => {
    setSearchDialogOpen(false)
    setResults([])
    setQuery('')
    setSearched(false)
  }

  const handleSearch = async () => {
    if (!query.trim()) return
    setLoading(true)
    setSearched(true)
    try {
      const response = await apiGet.fetchDataWithAxios({
        method: 'GET',
        url: `/searchs?q=${encodeURIComponent(query)}`,
        headers: { 'X-API-KEY': 'API_KEY' },
      })
      if (response && (response as any).data) {
        setResults((response as any).data)
      } else {
        setResults([])
      }
    } catch (error) {
      console.error('Error al buscar:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch()
  }

  useEffect(() => {
    if (searchDialogOpen) {
      const timeout = setTimeout(() => inputRef.current?.focus(), 150)
      return () => clearTimeout(timeout)
    }
  }, [searchDialogOpen])

  return (
    <>
      <div className={classNames(className, 'text-2xl cursor-pointer')} onClick={handleSearchOpen}>
        <PiMagnifyingGlassDuotone />
      </div>

      <Dialog
        contentClassName="!p-0"
        isOpen={searchDialogOpen}
        closable={false}
        onRequestClose={handleSearchClose}
      >
        <div className="bg-white dark:bg-gray-800 flex flex-col rounded-xl max-h-[80vh] overflow-hidden">

          <div className="flex items-center mx-5 my-3 justify-between border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center flex-1">
              <HiOutlineSearch className="text-xl text-gray-500" />
              <input
                ref={inputRef}
                className="ring-0 outline-none block w-full p-4 text-base bg-transparent text-gray-900 dark:text-gray-100"
                placeholder="Buscar informes, capacitaciones o supervisiones..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <Button size="xs" onClick={handleSearchClose}>
              Esc
            </Button>
          </div>

          <div className="flex-1">
            {(loading || results.length > 0 || searched) && (
              <div className="p-4 flex-1">
                {loading ? (
                  <div className="text-center text-gray-500 my-10">Buscando...</div>
                ) : (
                  <ScrollBar className="max-h-[400px] overflow-y-auto">
                    {results.length > 0 ? (
                      results.map((item, i) => {
                        if (item.base_datos === 'dgp' && item.origen === 'asistencia_tecnica') {
                          let url = item.url ? item.url : '/fortalecimiento/cursospi/cb'
                          return (
                            <a target='_blank' href={url}>
                              <div key={i} className="relative p-2 border-gray-200 dark:border-gray-700 mb-3 rounded-xl hover:shadow-sm transition-all bg-gray-50 dark:bg-gray-900">
                                <span className="absolute top-0 left-0 px-2 py-0.5 font-bold text-[10px] rounded-md bg-blue-600 text-white dark:bg-blue-900 dark:text-blue-200 shadow-sm">
                                  Asistencia técnica
                                </span>
                                <div className="flex justify-between items-start pt-3 pl-1">
                                  <div className="flex-1">
                                    <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-1">
                                      <Highlighter
                                        searchWords={query.trim().split(/\s+/)}
                                        autoEscape
                                        textToHighlight={item.instrumentos || item['categoria_instrumento'] || 'Sin título'}
                                        highlightClassName="bg-yellow-200 text-gray-900"
                                      />
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                      <Highlighter
                                        searchWords={query.trim().split(/\s+/)}
                                        autoEscape
                                        textToHighlight={item.all_text || item['instrumentos'] || ''}
                                        highlightClassName="bg-yellow-200 text-gray-900"
                                      />
                                    </p>
                                    <div className="text-xs text-gray-500 mt-2 space-x-2">
                                      {item.tipo_docum && <span>📄 {item.tipo_docum}</span>}
                                      {item.periodo && <span>🗓️ {item.periodo}</span>}
                                      {item.dpto && <span>📍 {item.dpto} - {item.provincia} - {item.distrito}</span>}
                                      {item.url ? <span>🌐</span> : <span>🔗</span>}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </a>
                          )
                        } else if (item.base_datos === 'dgp' && item.origen === 'evar_distritos_2025032') {
                          let url = '/fortalecimiento/evaluadorespi'
                          return (
                            <a target='_blank' href={url}>
                              <div key={i} className="relative p-2 border-gray-200 dark:border-gray-700 mb-3 rounded-xl hover:shadow-sm transition-all bg-gray-50 dark:bg-gray-900">
                                <span className="absolute top-0 left-0 px-2 py-0.5 font-bold text-[10px] rounded-md bg-green-600 text-white dark:bg-green-900 dark:text-green-200 shadow-sm">
                                  Evar de distritos
                                </span>
                                <div className="flex justify-between items-start pt-3 pl-1">
                                  <div className="flex-1">
                                  <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-1">
                                    <Highlighter
                                      searchWords={query.trim().split(/\s+/)}
                                      autoEscape
                                      textToHighlight={item.nombre || item['NOMBRE DE CURSO'] || 'Sin título'}
                                      highlightClassName="bg-yellow-200 text-gray-900"
                                    />
                                  </h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                    <Highlighter
                                      searchWords={query.trim().split(/\s+/)}
                                      autoEscape
                                      textToHighlight={item.descripcio || item.respuesta || ''}
                                      highlightClassName="bg-yellow-200 text-gray-900"
                                    />
                                  </p>
                                    <div className="text-xs text-gray-500 mt-2 space-x-2">
                                      {item.tipo_docum && <span>📄 {item.tipo_docum}</span>}
                                      {item.anio && <span>🗓️ {item.anio}</span>}
                                      {item.DEPARTAMEN && <span>📍 {item.DEPARTAMEN} - {item.PROVINCIA} - {item.DISTRITO}</span>}
                                      {item.url ? <span>🌐</span> : <span>🔗</span>}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </a>
                          )
                        }
                      })
                    ) : searched ? (
                      <div className="text-center text-gray-500 my-10">
                        No se encontraron resultados para <strong>"{query}"</strong>
                      </div>
                    ) : null}
                  </ScrollBar>
                )}
              </div>
            )}

          </div>
        </div>
      </Dialog>
    </>
  )
}

const Search = withHeaderItem(_Search)
export default Search
