import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table'

const TablaDepartamentos = ({ resultados = {}, loading = true }) => {
    const columns = [
        /*     {
            header: "ID",
            accessorKey: 'id',
            footer: 'Id'
        },*/
        {
            header: 'ENTIDAD',
            accessorKey: 'entidad',
            //footer: 'TOTALES'
        },
        {
            header: 'CATEGORIA',
            accessorKey: 'categoria',
            // footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => total + row.getValue('provincia'), 0)
        },
        {
            header: 'DOCUMENTOS',
            accessorKey: 'documentos',
            //footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => total + row.getValue('entidades_asistidas'), 0)
        },
        {
            header: 'ESTADO',
            accessorKey: 'estado',
            //footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => total + row.getValue('pprrd_vigentes'), 0)
        },
        {
            header: 'FECHA',
            accessorKey: 'fecha',
            //footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => total + row.getValue('brecha'), 0)
        },
    ]
    //const [data] = useState(() => [...asistenciasdetalles]);
    const table = useReactTable({
        data: resultados,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    })
    return (
        <div className="w-full p-2 mx-auto fill-gray-400">
            <table className="w-full border-collapse border border-gray-300 rounded-2xl">
                <thead className="cabecera-cenepred">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="capitalize px-3.5 py-2 border border-slate-300"
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext(),
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className="py-10 border-b border-gray-200 hover:bg-gray-100"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className="border border-slate-300 text-center"
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr className="h-32 text-center">
                            <td colSpan={12}>No se encontraron registros</td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    {table.getFooterGroups().map((footerGroup) => (
                        <tr key={footerGroup.id}>
                            {footerGroup.headers.map((footer) => (
                                <th
                                    key={footer.id}
                                    className="border border-slate-400 bg-gray-300"
                                >
                                    {flexRender(
                                        footer.column.columnDef.footer,
                                        footer.getContext(),
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            </table>
        </div>
    )
}

export default TablaDepartamentos
