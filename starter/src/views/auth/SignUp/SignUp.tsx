import Logo from '@/components/template/Logo'
import Alert from '@/components/ui/Alert'
import SignUpForm from './components/SignUpForm'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { useThemeStore } from '@/store/themeStore'
import { useNavigate } from 'react-router'

type SignUpProps = {
    disableSubmit?: boolean
    signInUrl?: string
}

export const SignUpBase = ({
    signInUrl = '/sign-in',
    disableSubmit,
}: SignUpProps) => {
    const [message, setMessage] = useTimeOutMessage()
    const navigate = useNavigate()
    const mode = useThemeStore((state) => state.mode)

    return (
        <>
            <div className="flex items-center justify-center gap-5 mb-4">
                <img
                    src="/img/logo/logo-cenepred.jpg"
                    alt="CENEPRED"
                    onClick={() => navigate('/')}
                    className="h-24 md:h-24 w-auto object-contain cursor-pointer"
                />
                <img
                    src="/img/logo/logo_sigrid.png"
                    alt="SIGRID"
                    className="h-18"
                    onClick={() =>
                    (window.location.href =
                        'https://sigrid.cenepred.gob.pe/sigridv3/')
                    }
                />

            </div>

            <div className="mb-5 text-center">
                <h1 className="text-2xl font-bold text-[#0097a7] mb-2">
                    Sistema CENEPRED
                </h1>
                {/* <h2 className="text-lg font-semibold mb-2 text-gray-700">
                    ¡Bienvenido de vuelta!
                </h2> */}
                <p className="font-medium text-gray-600">
                    Ingrese sus datos para registrarse en el sistema.
                </p>
            </div>

            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    <span className="break-all">{message}</span>
                </Alert>
            )}
            <SignUpForm disableSubmit={disableSubmit} setMessage={setMessage} />
            <div>
                <div className="mt-6 text-center">
                    <span>Ya tienes una cuenta? </span>
                    <ActionLink
                        to={signInUrl}
                        className="heading-text font-bold"
                        themeColor={false}
                    >
                        Iniciar sesión
                    </ActionLink>
                </div>
            </div>
        </>
    )
}

const SignUp = () => {
    return <SignUpBase />
}

export default SignUp
