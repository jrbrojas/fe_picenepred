import { useState, useRef, useEffect, useMemo } from 'react'
import classNames from '@/utils/classNames'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import ScrollBar from '@/components/ui/ScrollBar'
import { HiOutlineSearch } from 'react-icons/hi'
import { PiMagnifyingGlassDuotone } from 'react-icons/pi'
import Highlighter from 'react-highlight-words'
import apiGet from '@/services/ApiServiceSearch'
import basicos from './data/search/basicos'
import { Tooltip } from 'react-tooltip'

interface ResultadoBasico {
    base_datos: 'frontend';
    origen: 'frontend';
    texto: string;
    titulo: string;
    ruta: string;
}
const resultadoBasicos: ResultadoBasico[] = basicos.map((item) => ({
    base_datos: 'frontend',
    origen: 'frontend',
    ...item,
}))
const _Search = ({ className }: { className?: string }) => {
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLInputElement>(null) 
  const [suggestions, setSuggestions] = useState([]);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleSearchOpen = () => setSearchDialogOpen(true)
  const handleSearchClose = () => {
    setSearchDialogOpen(false)
    setResults([])
    setQuery('')
    setSearched(false)
  }

  const resultados = useMemo(() => {
    return resultadoBasicos.filter((i) => {
        if (!query) {
            return true;
        }

        const lower = `${i.titulo}|${i.texto}`.toLocaleLowerCase();
        return lower.includes(query.toLocaleLowerCase());
    }).concat(results)
  }, [results])

  const fetchSuggestions = async (term: string) => {
    if (!term.trim()) {
      setSuggestions([])
      return
    }
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setSuggestions([])
        return
      }
      const response = await apiGet.fetchDataWithAxios({
        method: 'GET',
        url: `/searchs/predict?q=${encodeURIComponent(term)}`,
        headers: { 'X-API-KEY': import.meta.env.VITE_API_KEY },
      })
      if (response && (response as any).data) {
        setSuggestions((response as any).data)
      } else {
        setSuggestions([])
      }
    } catch (error) {
      console.error('Error obteniendo sugerencias:', error)
    }
  }

  const handleSearch = async (term?: string) => {
    const value = term || query
    if (!value.trim()) return
    setLoading(true)
    setSearched(true)
    try {
      const response = await apiGet.fetchDataWithAxios({
        method: 'GET',
        url: `/searchs?q=${encodeURIComponent(value)}`,
        headers: { 'X-API-KEY': import.meta.env.VITE_API_KEY },
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
      setSuggestions([])
    }
  }

  const handleRemoveSuggestion = async (term: string) => {
    const value = term
    if (!value.trim()) return
    try {
      await apiGet.fetchDataWithAxios({
        method: 'DELETE',
        url: `/searchs/remove-suggestion?q=${encodeURIComponent(value)}`,
        headers: { 'X-API-KEY': import.meta.env.VITE_API_KEY },
      })
    } catch (error) {
      console.error('Error al remover sugerencia:', error)
    }
  }  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setQuery(val)
    setResults([])
    setSearched(false)
    if (typingTimeout.current) clearTimeout(typingTimeout.current)
    typingTimeout.current = setTimeout(() => fetchSuggestions(val), 300)
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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        !(target as HTMLElement).closest('.container-result')
      ) {
        setResults([]);
        setSearched(false);
      }
    };


    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setResults([])
        setSearched(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setSuggestions([])
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])
  const renderResultItem = (item: any, i: number) => {
    if (item.base_datos === 'frontend' && item.origen === 'frontend') {
        const elemento = item as ResultadoBasico;
        return (
            <a className="item-result" target='_blank' href={elemento.ruta} tabIndex={0}>
              <div key={i} className="relative p-2 border-gray-200 dark:border-gray-700 mb-3 rounded-xl hover:shadow-sm transition-all bg-gray-50 dark:bg-gray-900">
                <span className="absolute top-0 left-0 px-2 py-0.5 font-bold text-[10px] rounded-md bg-blue-600 text-white dark:bg-blue-900 dark:text-blue-200 shadow-sm">
                    Ir a sección
                </span>
                <div className="flex justify-between items-start pt-3 pl-1">
                  <div className="flex-1 hover:bg-red">
                    <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-1">
                      <Highlighter
                        searchWords={query.trim().split(/\s+/)}
                        autoEscape
                        textToHighlight={elemento.titulo}
                        highlightClassName="bg-yellow-200 text-gray-900"
                      />
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      <Highlighter
                        searchWords={query.trim().split(/\s+/)}
                        autoEscape
                        textToHighlight={elemento.texto}
                        highlightClassName="bg-yellow-200 text-gray-900"
                      />
                    </p>
                  </div>
                </div>
              </div>
            </a>
        );
    }
    if (item.base_datos === 'renat' && item.origen === 'asistencia_tecnica') {
      const url = item.url ? item.url : '/fortalecimiento/cursospi/cb'
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
    } else if (item.base_datos === 'renat' && item.origen === 'evar_distritos_2025032') {
      const url = '/fortalecimiento/evaluadorespi'
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
  }
  return (
    <>
        <Tooltip
            id="home-tooltip"
            style={{ zIndex: 1000 }}
            opacity={1}
            place="top"
            offset={0}
        />
      <div
        ref={containerRef}
        id="search"
        data-tooltip-id='home-tooltip'
        data-tooltip-content='Buscar escenarios de riesgo, informes, capacitaciones, supervisiones o reportes!'
        className={classNames(
          className,
          'relative text-2xl cursor-pointer hidden lg:block xl:w-120 2xl:w-140'
        )}
        style={{ backgroundColor: '#eaeaea92' }}
      >
        <div className="relative w-full">
          <div className="flex items-center flex-1 pe-2 relative">
            <input
              ref={inputRef}
              id="inputsearch"
              className="ring-0 outline-none block w-full px-3 py-2 text-base bg-transparent text-gray-900 dark:text-gray-100"
              placeholder="Buscar..."
              value={query}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("")
                  setSuggestions([])
                }}
                className="absolute right-8 text-gray-400 hover:text-red-500"
                title="Limpiar búsqueda"
                tabIndex={-1}
              >
                ✕
              </button>
            )}
            <PiMagnifyingGlassDuotone className="absolute right-2 text-gray-600" />
          </div>

          {suggestions.length > 0 && (
            <ul
              className="absolute z-150 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto text-sm"
              role="listbox"
            >
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-800 dark:text-gray-200 focus:bg-gray-100 dark:focus:bg-gray-700 outline-none"
                  role="option"
                  tabIndex={0}
                  onClick={() => {
                    setQuery(s)
                    handleSearch(s)
                    inputRef.current?.focus()
                    setSuggestions([])
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      setQuery(s)
                      inputRef.current?.focus()
                      setSuggestions([])
                      handleSearch(s)
                    }
                  }}
                >
                  <span className="truncate">{s}</span>
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSuggestions((prev) => prev.filter((x) => x !== s))
                      handleRemoveSuggestion(s)
                    }}
                    className="text-gray-400 hover:text-red-500 text-xs"
                    title="Eliminar sugerencia"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}

        </div>

        {resultados.length > 0 && (
          <div
            tabIndex={0}
            aria-label="Resultados de busqueda"
            className="container-result absolute left-0 top-full mt-1 w-full z-50 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <ScrollBar className="max-h-[350px] overflow-y-auto p-3">
              {resultados.map((item, i) => renderResultItem(item, i))}
            </ScrollBar>
          </div>
        )}
      </div>


      <div className={classNames(className, 'text-2xl cursor-pointer block lg:hidden')} onClick={handleSearchOpen}>
        <PiMagnifyingGlassDuotone />
      </div>

      <Dialog
        contentClassName="!p-0"
        isOpen={searchDialogOpen}
        closable={false}
        onRequestClose={handleSearchClose}
      >
        <div className="bg-white dark:bg-gray-800 flex flex-col rounded-xl max-h-[80vh] overflow-hidden">

          <div
            className="flex items-center mx-5 my-3 justify-between border-b border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center flex-1">
              <HiOutlineSearch className="text-xl text-gray-500" />
              <input
                ref={inputRef}
                className="ring-0 outline-none block w-full p-4 text-base bg-transparent text-gray-900 dark:text-gray-100"
                placeholder="Buscar..."
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value)
                    setResults([])
                }}
                onKeyDown={handleKeyDown}
              />
            </div>
            <Button size="xs" onClick={handleSearchClose}>
              Esc
            </Button>
          </div>

              <div className="flex-1">
                  <ScrollBar className="max-h-[400px] overflow-y-auto p-4">
                    {resultados.length > 0 ? (
                      resultados.map((item, i) => renderResultItem(item, i))
                    ) : searched ? (
                      <div className="text-center text-gray-500 my-10">
                        No se encontraron resultados para <strong>"{query}"</strong>
                      </div>
                    ) : null}
                  </ScrollBar>
                  {loading && <div className="text-center text-gray-500 my-10">Buscando...</div>}
              </div>
          </div>
      </Dialog>
    </>
  )
}

const Search = withHeaderItem(_Search)
export default Search
