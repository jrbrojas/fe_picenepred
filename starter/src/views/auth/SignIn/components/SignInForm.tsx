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
import type { CommonProps } from '@/@types/common'
import type { ReactNode } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface SignInFormProps extends CommonProps {
    disableSubmit?: boolean
    passwordHint?: string | ReactNode
    setMessage?: (message: string) => void
    verified?: boolean
    children?: ReactNode
}

type SignInFormSchema = {
    email: string
    password: string
}

const validationSchema = z.object({
    email: z.string().min(1, { message: 'Ingresar su correo electrónico' }),
    password: z.string().min(1, { message: 'Ingresar su contraseña' }),
})

const SignInForm = (props: SignInFormProps) => {
    const [isSubmitting, setSubmitting] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState(false)

    const {
        disableSubmit = false,
        className,
        setMessage,
        passwordHint,
        verified = false,
        children,
    } = props

    const { handleSubmit, formState: { errors }, control, } = useForm<SignInFormSchema>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: zodResolver(validationSchema),
    })

    const { signIn } = useAuth()

    const onSignIn = async (values: SignInFormSchema) => {
        if (!verified) {
            setMessage?.('Por favor verifica el reCAPTCHA antes de continuar.')
            return
        }
        const { email, password } = values

        if (!disableSubmit) {
            setSubmitting(true)

            const result = await signIn({ email, password })

            if (result?.status === 'failed') {
                setMessage?.(result.message)
            }
        }

        setSubmitting(false)
    }

    return (
        <div className={className}>
            <Form onSubmit={handleSubmit(onSignIn)}>
                <FormItem
                    label="Correo electrónico"
                    invalid={Boolean(errors.email)}
                    errorMessage={errors.email?.message}
                >
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="email"
                                placeholder="correo@gmail.com"
                                autoComplete="email"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Contraseña"
                    invalid={Boolean(errors.password)}
                    errorMessage={errors.password?.message}
                >
                    <div className="relative">
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    placeholder="Contraseña"
                                    className="pr-10 appearance-none"
                                    {...field}
                                />
                            )}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-blue-600 transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                            tabIndex={-1}
                        >
                            {!showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </FormItem>

                {children}
                {passwordHint}

                <Button
                    block
                    loading={isSubmitting}
                    variant="solid"
                    type="submit"
                >
                    {isSubmitting ? 'INGRESANDO...' : 'INGRESAR'}
                </Button>
            </Form>
        </div>
    )
}

export default SignInForm
