import useCustomerList from '../hooks/useUsuarioList'
import SearchUsuario from './SearchUsuario'
import CustomerTableFilter from './TableFilterUsuario'
import cloneDeep from 'lodash/cloneDeep'

const TableToolsUsuario = () => {
    const { tableData, setTableData } = useCustomerList()

    const handleInputChange = (val: string) => {
        const newTableData = cloneDeep(tableData)
        newTableData.query = val
        newTableData.pageIndex = 1
        if (typeof val === 'string' && val.length > 1) {
            setTableData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            setTableData(newTableData)
        }
    }

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <SearchUsuario onInputChange={handleInputChange} />
            {/* <CustomerTableFilter /> */}
        </div>
    )
}

export default TableToolsUsuario
