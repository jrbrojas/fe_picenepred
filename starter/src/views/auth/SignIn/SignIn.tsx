import Logo from '@/components/template/Logo'
import Alert from '@/components/ui/Alert'
import SignInForm from './components/SignInForm'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { useThemeStore } from '@/store/themeStore'
import { useNavigate } from 'react-router'

type SignInProps = {
    signUpUrl?: string
    forgetPasswordUrl?: string
    disableSubmit?: boolean
}

export const SignInBase = ({
    signUpUrl = '/sign-up',
    forgetPasswordUrl = '/forgot-password',
    disableSubmit,
}: SignInProps) => {
    const [message, setMessage] = useTimeOutMessage()
    const navigate = useNavigate()
    const mode = useThemeStore((state) => state.mode)

    return (
        <>
            <div className="mb-8">
                <div className="flex items-center gap-5">
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
            </div>

            <div className="mb-8">
                <h1 className="mb-2">Sistema CENEPRED</h1>
                <p className="font-medium text-gray-600">
                    Ingrese sus credenciales para acceder al sistema
                </p>

            </div>

            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    <span className="break-all">{message}</span>
                </Alert>
            )}
            <SignInForm
                disableSubmit={disableSubmit}
                setMessage={setMessage}
                passwordHint={
                    <div className="mb-7 mt-2">
                        <ActionLink
                            to={forgetPasswordUrl}
                            className="font-semibold heading-text mt-2 underline"
                            themeColor={false}
                        >
                            ¿Olvidó su contraseña?
                        </ActionLink>
                    </div>
                }
            />

            <div className="mt-2 text-center">
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                        <strong>
                            Centro Nacional de Estimación, Prevención y
                            Reducción del Riesgo de Desastres
                        </strong>
                    </p>
                    <p className="text-xs text-gray-500">
                        Sistema de Gestión Institucional para la Reducción del
                        Riesgo de Desastres
                    </p>
                </div>

                {/* Credenciales de prueba */}
                {/* <div className="bg-blue-50 p-4 rounded-lg text-left">
                    <h4 className="text-sm font-semibold text-[#0097a7] mb-2">
                        Credenciales de Prueba:
                    </h4>
                    <div className="text-xs text-gray-600 space-y-1">
                        <div>
                            <strong>Admin:</strong> admin@cenepred.gob.pe /
                            cenepred123
                        </div>
                        <div>
                            <strong>Usuario:</strong> usuario@cenepred.gob.pe /
                            123456
                        </div>
                        <div>
                            <strong>Template:</strong> admin-01@ecme.com /
                            123Qwe
                        </div>
                    </div>
                </div> */}
            </div>

            <div className="mt-2 text-center">
                <span className="text-sm text-gray-600">
                    ¿No tiene una cuenta?{' '}
                </span>
                <ActionLink
                    to={signUpUrl}
                    className="text-[#0097a7] font-bold hover:text-[#00838f]"
                    themeColor={false}
                >
                    Registrate
                </ActionLink>
            </div>

        </>
    )
}

const SignIn = () => {
    return <SignInBase />
}

export default SignIn
