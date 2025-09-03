import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormItem, Form } from '@/components/ui/Form'
import PasswordInput from '@/components/shared/PasswordInput'
import classNames from '@/utils/classNames'
import { useAuth } from '@/auth'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import type { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface SignInFormProps extends CommonProps {
    disableSubmit?: boolean
    passwordHint?: string | ReactNode
    setMessage?: (message: string) => void
}

type SignInFormSchema = {
    email: string
    password: string
}

const validationSchema: ZodType<SignInFormSchema> = z.object({
    email: z
        .string({ required_error: 'Please enter your email' })
        .min(1, { message: 'Please enter your email' }),
    password: z
        .string({ required_error: 'Please enter your password' })
        .min(1, { message: 'Please enter your password' }),
})

const REDIRECT_KEY = 'postLoginRedirect'

const SignInForm = (props: SignInFormProps) => {
    const [isSubmitting, setSubmitting] = useState<boolean>(false)

    const { disableSubmit = false, className, setMessage, passwordHint } = props

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<SignInFormSchema>({
        defaultValues: {
            email: 'admin-01@ecme.com',
            password: '123Qwe',
        },
        resolver: zodResolver(validationSchema),
    })

    const { signIn } = useAuth()

    const navigate = useNavigate()
    const location = useLocation()

    const onSignIn = async (values: SignInFormSchema) => {
        if (disableSubmit) return

        setSubmitting(true)
        try {
            const result = await signIn(values)

            if (result?.status === 'failed') {
                setMessage?.(result.message || 'Credenciales inválidas')
                return
            }

            // 👇 Resuelve el destino final: ?next=… -> localStorage -> '/'
            const params = new URLSearchParams(location.search)
            const nextFromQuery = params.get('next') || ''
            const nextFromStorage = localStorage.getItem(REDIRECT_KEY) || ''
            const next = nextFromQuery || nextFromStorage || '/'

            // limpia el redirect guardado (si lo hubiera)
            localStorage.removeItem(REDIRECT_KEY)

            // navega al destino
            navigate(next, { replace: true })
        } finally {
            setSubmitting(false)
        }
    }

    /*  const onSignIn = async (values: SignInFormSchema) => {
        const { email, password } = values

        if (!disableSubmit) {
            setSubmitting(true)

            const result = await signIn({ email, password })

            if (result?.status === 'failed') {
                setMessage?.(result.message)
            }
        }

        setSubmitting(false)
    } */

    return (
        <div className={className}>
            <Form onSubmit={handleSubmit(onSignIn)}>
                <FormItem
                    label="Correo"
                    invalid={Boolean(errors.email)}
                    errorMessage={errors.email?.message}
                >
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="email"
                                placeholder="Email"
                                autoComplete="off"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Contraseña"
                    invalid={Boolean(errors.password)}
                    errorMessage={errors.password?.message}
                    className={classNames(
                        passwordHint ? 'mb-0' : '',
                        errors.password?.message ? 'mb-8' : '',
                    )}
                >
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <PasswordInput
                                type="text"
                                placeholder="Password"
                                autoComplete="off"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                {passwordHint}
                <Button
                    block
                    loading={isSubmitting}
                    variant="solid"
                    type="submit"
                >
                    {isSubmitting ? 'Ingresando...' : 'Ingresar'}
                </Button>
            </Form>
        </div>
    )
}

export default SignInForm
