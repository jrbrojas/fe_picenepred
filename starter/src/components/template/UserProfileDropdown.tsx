import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import { useSessionUser } from '@/store/authStore'
import { Link } from 'react-router'
import {
    PiUserDuotone,
    PiGearDuotone,
    PiPulseDuotone,
    PiSignOutDuotone,
} from 'react-icons/pi'
import { useAuth } from '@/auth'
import type { JSX } from 'react'
import Search from './Search'

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

    const { signOut } = useAuth()

    const handleSignOut = () => {
        signOut()
    }

    const avatarProps = {
        ...(avatar ? { src: avatar } : { icon: <PiUserDuotone /> }),
    }

    return (
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
                <Search />
                <Dropdown
                    className="flex"
                    toggleClassName="flex items-center"
                    renderTitle={
                        <div className="flex items-center gap-3 cursor-pointer">
                            {/* Datos del usuario */}
                            <div className="flex flex-col text-right">
                                <span className="text-lg font-semibold tracking-wide">
                                    {nombres} {apellidos}
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
        </div>
    )

}

const UserDropdown = withHeaderItem(_UserDropdown)

export default UserDropdown
