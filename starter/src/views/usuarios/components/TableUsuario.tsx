import { useMemo } from 'react'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import { useNavigate } from 'react-router'
import cloneDeep from 'lodash/cloneDeep'
import { TbPencil, TbEye } from 'react-icons/tb'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { Usuario } from '../types'
import type { TableQueries } from '@/@types/common'
import useUsuarioList from '../hooks/useUsuarioList'
import EditUsuario from './EditUsuario'
import DeleteUsuario from './DeleteUsuario'

const TableUsuario = () => {
    const navigate = useNavigate()
    
    const {
        usuarioList,
        usuarioListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllUsuario,
        setSelectedUsuario,
        selectedUsuario,
    } = useUsuarioList()
    
    const columns: ColumnDef<Usuario>[] = useMemo(
        () => [
            {
                header: 'Nombres',
                accessorKey: 'nombres',
            },
            {
                header: 'Apellidos',
                accessorKey: 'apellidos',
            },
            {
                header: 'Correo Electrónico',
                accessorKey: 'email',
            },
            {
                header: '',
                id: 'action',
                cell: (props) => (
                    <div className="flex items-center gap-3">
                        <EditUsuario usuario={props.row.original} />
                        <DeleteUsuario userId={props.row.original.id} />
                    </div>

                ),
            },
        ],
        [],
    )

    const handleSetTableData = (data: TableQueries) => {
        setTableData(data)
        if (selectedUsuario.length > 0) {
            setSelectAllUsuario([])
        }
    }

    const handlePaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        handleSetTableData(newTableData)
    }

    const handleSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        handleSetTableData(newTableData)
    }

    const handleSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        handleSetTableData(newTableData)
    }

    const handleRowSelect = (checked: boolean, row: Usuario) => {
        setSelectedUsuario(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<Usuario>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllUsuario(originalRows)
        } else {
            setSelectAllUsuario([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={usuarioList}
            noData={!isLoading && usuarioList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: usuarioListTotal,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            checkboxChecked={(row) =>
                selectedUsuario.some((selected) => selected.id === row.id)
            }
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default TableUsuario
