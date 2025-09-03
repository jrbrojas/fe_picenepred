import classNames from 'classnames'
import { APP_NAME } from '@/constants/app.constant'
import type { CommonProps } from '@/@types/common'
import { useAuth } from '@/auth'

interface LogoProps extends CommonProps {
    type?: 'full' | 'streamline'
    mode?: 'light' | 'dark'
    imgClass?: string
    logoWidth?: number | string
}

const LOGO_SRC_PATH = '/img/logo/'

const Logo = (props: LogoProps) => {
    const {
        type = 'full',
        mode = 'light',
        className,
        imgClass,
        style,
        logoWidth = 'auto',
    } = props
    const { signOut } = useAuth()

    const handleSignOut = () => {
        signOut()
    }
    return (
        <div
            className={classNames('logo', className)}
            style={{
                ...style,
                ...{ width: logoWidth },
            }}
        >
            <img
                src="/img/logo/logo_cenepred.png"
                alt="CENEPRED"
                className="h-14 md:h-14 w-auto object-contain"
                onClick={handleSignOut}
            />
        </div>
    )
}

export default Logo
