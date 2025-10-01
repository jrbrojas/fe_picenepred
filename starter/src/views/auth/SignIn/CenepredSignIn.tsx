import Alert from '@/components/ui/Alert'
import SignInForm from './components/SignInForm'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type CenepredSignInProps = {
    signUpUrl?: string
    forgetPasswordUrl?: string
    disableSubmit?: boolean
}

export const CenepredSignIn = ({
    signUpUrl = '/sign-up',
    forgetPasswordUrl = '/forgot-password',
    disableSubmit,
}: CenepredSignInProps) => {
    const [message, setMessage] = useTimeOutMessage()
    const navigate = useNavigate();
    return (
        <>
            {/* Header con logos CENEPRED */}
            <div className="mb-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <img
                            src="/img/logo/logo-cenepred.jpg"
                            alt="CENEPRED"
                            onClick={() => navigate('/')}
                            className="h-24 md:h-24 w-auto object-contain cursor-pointer"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
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
            </div>

            {/* Título personalizado */}
            <div className="mb-5 text-center">
                <h1 className="text-2xl font-bold text-[#0097a7] mb-2">
                    Sistema CENEPRED
                </h1>
                {/* <h2 className="text-lg font-semibold mb-2 text-gray-700">
                    ¡Bienvenido de vuelta!
                </h2> */}
                <p className="font-medium text-gray-600">
                    Ingrese sus credenciales para acceder al sistema
                </p>
            </div>

            {/* Mensaje de error */}
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    <span className="break-all">{message}</span>
                </Alert>
            )}

            {/* Formulario de login */}
            <SignInForm
                disableSubmit={disableSubmit}
                setMessage={setMessage}
                passwordHint={
                    <div className="mb-7 mt-2">
                        <ActionLink
                            to={forgetPasswordUrl}
                            className="font-semibold text-[#0097a7] mt-2 underline hover:text-[#00838f]"
                            themeColor={false}
                        >
                            ¿Olvidó su contraseña?
                        </ActionLink>
                    </div>
                }
            />

            {/* Información adicional */}
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

            {/* Enlace para registro (opcional) */}
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
    return <CenepredSignIn />
}

export default SignIn
