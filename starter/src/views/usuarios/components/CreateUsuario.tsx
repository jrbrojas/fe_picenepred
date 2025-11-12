
import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import type { MouseEvent } from 'react'
import { BiPlus } from 'react-icons/bi'
import { Form, FormItem, Input, Notification, Select, toast } from '@/components/ui'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { apiCreateUsuario } from '@/services/UsuariosService'
import useUsuarioList from '../hooks/useUsuarioList'
import useRolesList from '../hooks/useRoleList'

const validationSchema = z.object({
  nombres: z.string().min(2, { message: 'El nombre es requerido' }).max(100, { message: 'El nombre debe tener menos de 100 caracteres' }),
  apellidos: z.string().min(2, { message: 'El apellido es requerido' }).max(100, { message: 'El apellido debe tener menos de 100 caracteres' }),
  email: z.string().min(2, { message: 'El correo es requerido' }).max(100, { message: 'El correo debe tener menos de 100 caracteres' }).email({ message: 'El correo no es valido' }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  password_confirmation: z.string().min(6, { message: "La confirmación de contraseña es requerida" }),
  rol: z.string().min(1, { message: 'El rol es requerido' }),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Las contraseñas no coinciden",
  path: ["password_confirmation"], // Este campo mostrará el error
});

type FormSchema = z.infer<typeof validationSchema>

const CreateUsuario = () => {
  const [dialogIsOpen, setIsOpen] = useState(false);
  const [isSubmiting, setSubmiting] = useState(false);
  const { mutate } = useUsuarioList();
  const { rolesList, isLoading, error } = useRolesList();

  const openDialog = () => {
    reset()
    setIsOpen(true)
  }

  const onDialogClose = (e: MouseEvent) => {
    setIsOpen(false)
  }

  const { handleSubmit, formState: { errors }, control, reset } = useForm<FormSchema>({
    defaultValues: {
      nombres: '',
      apellidos: '',
      email: '',
      rol: '',
      password: '',
      password_confirmation: '',
    },
    resolver: zodResolver(validationSchema),
  })

  const onSubmit = async (formValue: FormSchema) => {
    setSubmiting(true)
    try {
      await apiCreateUsuario(formValue)
      setIsOpen(false)
      mutate();
      toast.push(
        <Notification
          title="Usuario creado"
          type="success"
        >
          El usuario ha sido creado exitosamente.
        </Notification>
      )
    } catch (error) {
      toast.push(
        <Notification
          title="Error al crear usuario"
          type="danger"
        >
          Hubo un problema al intentar crear el usuario. Por favor, intenta de nuevo.
        </Notification>
      )
    } finally {
      setSubmiting(false)
    }
  }

  const roles = rolesList.map(role => ({
    label: role.name.toUpperCase(),
    value: role.name.toUpperCase(),
  }));

  return (
    <div>
      <Button variant="solid" icon={<BiPlus className='text-xl' />} onClick={() => openDialog()}>
        Nuevo
      </Button>
      <Dialog
        isOpen={dialogIsOpen}
        bodyOpenClassName="overflow-hidden"
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
      >
        <h5 className="mb-4">Nuevo usuario</h5>
        {/* Form content can go here */}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-4'>

            <FormItem
              label="Apellidos"
              invalid={Boolean(errors.nombres)}
              errorMessage={errors.nombres?.message}
            >
              <Controller
                name="nombres"
                control={control}
                render={({ field }) => (
                  <Input type="text" placeholder='Juan Carlos' autoComplete="off" {...field} />
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
                  <Input type="text" placeholder='Perez Perez' autoComplete="off" {...field} />
                )}
              />
            </FormItem>

            <FormItem
              label="Correo electronico"
              invalid={Boolean(errors.email)}
              errorMessage={errors.email?.message}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input type="email" placeholder='Ingresar correo electronico' autoComplete="off" {...field} />
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
              label="Contraseña"
              invalid={Boolean(errors.password)}
              errorMessage={errors.password?.message}
            >
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input type="password" placeholder='Ingresar contraseña' autoComplete="off" {...field} />
                )}
              />
            </FormItem>

            <FormItem
              label="Confirmar Contraseña"
              invalid={Boolean(errors.password_confirmation)}
              errorMessage={errors.password_confirmation?.message}
            >
              <Controller
                name="password_confirmation"
                control={control}
                render={({ field }) => (
                  <Input type="password" placeholder='Confirmar contraseña' autoComplete="off" {...field} />
                )}
              />
            </FormItem>

          </div>
          <div className="text-right mt-6">
            <Button
              type='button'
              className="ltr:mr-2 rtl:ml-2"
              variant="plain"
              onClick={onDialogClose}
            >
              Cancelar
            </Button>
            <Button type='submit' variant="solid" disabled={isSubmiting}>
              Guardar
            </Button>
          </div>
        </Form>

      </Dialog>
    </div>
  )
}

export default CreateUsuario

