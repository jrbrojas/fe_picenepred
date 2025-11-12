import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormItem, Form } from '@/components/ui/Form'
import { useAuth } from '@/auth'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff } from 'lucide-react'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import { Select } from '@/components/ui'

interface SignUpFormProps extends CommonProps {
    disableSubmit?: boolean
    setMessage?: (message: string) => void
}

type SignUpFormSchema = {
    nombres: string
    apellidos: string
    usuario: string
    rol: string
    password: string
    email: string
    confirmPassword: string
}

const validationSchema = z.object({
    email: z.string({ message: 'Ingresar su correo electrónico' }),
    nombres: z.string({ message: 'Por favor ingresar sus nombres completos' }),
    apellidos: z.string({ message: 'Por favor ingresar sus apellidos completos' }),
    usuario: z.string({ message: 'El nombre de usuario es obligatorio' }),
    rol: z.string({ message: 'Seleccione un rol para el usuario' }),
    password: z.string({ message: 'La contraseña es obligatoria' }),
    confirmPassword: z.string({
        message: 'Debes confirmar tu contraseña',
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'La contraseña no coincide',
    path: ['confirmPassword'],
})

const SignUpForm = (props: SignUpFormProps) => {
    const { disableSubmit = false, className, setMessage } = props

    const roles = [
        { label: 'ADMIN', value: 'ADMIN' },
        { label: 'USER', value: 'USER' }
    ]

    const [isSubmitting, setSubmitting] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const { signUp } = useAuth()

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<SignUpFormSchema>({
        resolver: zodResolver(validationSchema),
    })

    const onSignUp = async (values: SignUpFormSchema) => {
        const { nombres, apellidos, rol, password, email } = values

        if (!disableSubmit) {
            setSubmitting(true)
            const result = await signUp({ nombres, apellidos, rol, password, email })

            console.log(result);
            

            if (result?.status === 'failed') {
                setMessage?.(result.message)
            }

            setSubmitting(false)
        }
    }

    return (
        <div className={className}>
            <Form onSubmit={handleSubmit(onSignUp)} >
                <div className='grid grid-cols-2 gap-3'>
                    <FormItem
                        label="Nombre(s)"
                        invalid={Boolean(errors.nombres)}
                        errorMessage={errors.nombres?.message}
                    >
                        <Controller
                            name="nombres"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    placeholder="Ingrese nombre(s)"
                                    autoComplete="given-name"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>

                    <FormItem
                        label="Apellidos"
                        invalid={Boolean(errors.apellidos)}
                        errorMessage={errors.apellidos?.message}
                    >
                        <Controller
                            name="apellidos"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    placeholder="Ingrese apellidos"
                                    autoComplete="family-name"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>

                    <FormItem
                        label="Rol"
                        invalid={Boolean(errors.rol)}
                        errorMessage={errors.rol?.message}
                    >
                        <Controller
                            name="rol"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    placeholder="Seleccione"
                                    isClearable
                                    options={roles}
                                    value={roles.filter(
                                        (role) => role.value === field.value,
                                    )}
                                    onChange={(option) => field.onChange(option?.value)}
                                />
                            )}
                        />

                    </FormItem>

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
                                    placeholder="Correo electrónico"
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

                    <FormItem
                        label="Confirmar contraseña"
                        invalid={Boolean(errors.confirmPassword)}
                        errorMessage={errors.confirmPassword?.message}
                    >
                      <div className="relative">
                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type={showConfirm ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    placeholder="Confirmar contraseña"
                                    className="pr-10 appearance-none"
                                    {...field}
                                />
                            )}
                        />

                    <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-blue-600 transition-colors"
                                onClick={() => setShowConfirm(!showConfirm)}
                                tabIndex={-1}
                            >
                                {!showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    </div>
                    </FormItem>

                </div>
                <Button
                    block
                    loading={isSubmitting}
                    variant="solid"
                    type="submit"
                >
                    {isSubmitting ? 'Creando cuenta...' : 'Registrarse'}
                </Button>
            </Form>
        </div>
    )
}

export default SignUpForm
