import Dropdown from '@/components/ui/Dropdown'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import { useSessionUser } from '@/store/authStore'
import {
    PiUserDuotone,
    PiGearDuotone,
    PiPulseDuotone,
    PiSignOutDuotone,
    PiUsers,
} from 'react-icons/pi'
import { useAuth } from '@/auth'
import type { JSX } from 'react'
import Search from './Search'
import { FaBook } from 'react-icons/fa'
import { Tooltip } from '../ui'
import { useNavigate } from 'react-router'

type DropdownList = {
    label: string
    path: string
    icon: JSX.Element
}

const dropdownItemList: DropdownList[] = [
    {
        label: 'Profile',
        path: '/concepts/account/settings',
        icon: <PiUserDuotone />,
    },
    {
        label: 'Account Setting',
        path: '/concepts/account/settings',
        icon: <PiGearDuotone />,
    },
    {
        label: 'Activity Log',
        path: '/concepts/account/activity-log',
        icon: <PiPulseDuotone />,
    },
]

const _UserDropdown = () => {
    const { avatar, nombres, apellidos, rol, email } = useSessionUser((state) => state.user)
    const navigate = useNavigate();

    const { signOut } = useAuth()

    const handleSignOut = () => {
        signOut()
    }

    const handleGestionUsuarios = () => {
        localStorage.setItem(
            'redirectTo',
            'gestion-usuarios',
        )

        navigate("/gestion-usuarios");
    }

    const avatarProps = {
        ...(avatar ? { src: avatar } : { icon: <PiUserDuotone /> }),
    }

    const abreviarNombre = (nombres = '', apellidos = '') => {
        const primeraLetraApellido = apellidos ? apellidos.split(" ")[0][0] + "." : "";
        return `${nombres} ${primeraLetraApellido}`;
    };

    return (
        <div className="flex w-full items-center ps-3 pe-5 justify-between lg:justify-start lg:gap-5">
            <Tooltip title="Contiene instrucciones sobre el registro de entidades, informes y supervisiones.">
                <a href="https://sigrid.cenepred.gob.pe/sigridv3/difusion-manuales" target='_blank'
                    className="text-lg flex gap-2 items-center text-[#078199] hover:text-[#055E70]" aria-label='Contiene instrucciones sobre el registro de entidades, informes y supervisiones.'>
                    <span className="hidden lg:block">Manual de Usuario</span>
                    <FaBook />
                </a>
            </Tooltip>
            <Search />
            <Dropdown
                className="flex"
                toggleClassName="flex items-center"
                renderTitle={
                    <div className="flex items-center gap-3 cursor-pointer">
                        {/* Datos del usuario */}
                        <div className="flex flex-col text-right">
                            <span className="text-lg font-semibold tracking-wide whitespace-nowrap">
                                {abreviarNombre(nombres, apellidos)}
                            </span>
                            <span className="text-sm text-gray-500">{rol}</span>
                        </div>

                        {/* Ícono o avatar si tienes */}
                        {/* <Avatar src={foto} /> */}
                    </div>
                }
                placement="bottom-end"
            >
                <Dropdown.Item variant="header">
                    <div className="py-2 px-3">
                        <div className="font-bold text-gray-900 dark:text-gray-100">
                            {`${nombres} ${apellidos}` || 'Anonymous'}
                        </div>
                        <div className="text-xs">{email || 'No email available'}</div>
                        <div className="text-xs">{rol || 'No rol available'}</div>
                    </div>
                </Dropdown.Item>

                <Dropdown.Item
                    eventKey="Gestion usuarios"
                    className="gap-2"
                    onClick={handleGestionUsuarios}
                >
                    <span className="text-xl">
                        <PiUsers />
                    </span>
                    <span>Gestion de usuarios</span>
                </Dropdown.Item>

                <Dropdown.Item variant="divider" />

                <Dropdown.Item
                    eventKey="Sign Out"
                    className="gap-2"
                    onClick={handleSignOut}
                >
                    <span className="text-xl">
                        <PiSignOutDuotone />
                    </span>
                    <span>Cerrar sesión</span>
                </Dropdown.Item>
            </Dropdown>
        </div>
    )

}

const UserDropdown = withHeaderItem(_UserDropdown)

export default UserDropdown
