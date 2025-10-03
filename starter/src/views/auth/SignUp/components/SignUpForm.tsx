import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormItem, Form } from '@/components/ui/Form'
import { useAuth } from '@/auth'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
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
    fuente: string
    password: string
    email: string
    confirmPassword: string
}

const validationSchema = z.object({
    email: z.string({ message: 'Ingresar su correo electrónico' }),
    nombres: z.string({ message: 'Porfavor ingesar sus nombres completos' }),
    apellidos: z.string({ message: 'Porfavor ingresar sus apellidos completos' }),
    usuario: z.string({ message: 'Porfavor ingresar el nombre de usuario' }),
    rol: z.string({ message: 'Seleccione un rol para el usuario' }),
    fuente: z.string({ message: 'La fuente es obligatoria' }),
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

    const { signUp } = useAuth()

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<SignUpFormSchema>({
        resolver: zodResolver(validationSchema),
    })

    const onSignUp = async (values: SignUpFormSchema) => {
        const { nombres, apellidos, usuario, rol, fuente, password, email } = values

        if (!disableSubmit) {
            setSubmitting(true)
            const result = await signUp({ nombres, apellidos, usuario, rol, fuente, password, email })

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
                        label="Nombres"
                        invalid={Boolean(errors.nombres)}
                        errorMessage={errors.nombres?.message}
                    >
                        <Controller
                            name="nombres"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    placeholder="Ingresar nombres completos"
                                    autoComplete="off"
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
                                    placeholder="Ingresar apellidos completos"
                                    autoComplete="off"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>

                    <FormItem
                        label="Nombre de usuario"
                        invalid={Boolean(errors.usuario)}
                        errorMessage={errors.usuario?.message}
                    >
                        <Controller
                            name="usuario"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    placeholder="Ingresar nombre de usuario"
                                    autoComplete="off"
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
                                    placeholder="Seleccione un rol"
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
                        label="Fuente"
                        invalid={Boolean(errors.fuente)}
                        errorMessage={errors.fuente?.message}
                    >
                        <Controller
                            name="fuente"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    placeholder="Fuente"
                                    autoComplete="off"
                                    {...field}
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
                    >
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="password"
                                    autoComplete="off"
                                    placeholder="Contraseña"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>

                    <FormItem
                        label="Confirmar contraseña"
                        invalid={Boolean(errors.confirmPassword)}
                        errorMessage={errors.confirmPassword?.message}
                    >
                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="password"
                                    autoComplete="off"
                                    placeholder="Confirmar contraseña"
                                    {...field}
                                />
                            )}
                        />
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
