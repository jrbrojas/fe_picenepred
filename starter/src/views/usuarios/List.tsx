import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import CustomerListTable from './components/TableUsuario'
import TableToolsUsuario from './components/TableToolsUsuario'
import CreateUsuario from './components/CreateUsuario'

const Usuarios = () => {
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Usuarios</h3>
                            <div className="flex flex-col md:flex-row gap-3">
                                <CreateUsuario />
                            </div>
                        </div>
                        <TableToolsUsuario />
                        <CustomerListTable />
                    </div>
                </AdaptiveCard>
            </Container>
            {/* <CustomerListSelected /> */}
        </>
    )
}

export default Usuarios
