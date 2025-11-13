
import { useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import type { MouseEvent } from 'react'
import { Form, FormItem, Input, Notification, Select, toast, Tooltip } from '@/components/ui'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TbPencil } from 'react-icons/tb'
import { Usuario } from '../types'
import useUsuarioList from '../hooks/useUsuarioList'
import { apiEditUsuario } from '@/services/UsuariosService'
import useRolesList from '../hooks/useRoleList'
import { Eye, EyeOff } from 'lucide-react'

const validationSchema = z.object({
  nombres: z.string().min(2, { message: 'El nombre es requerido' }).max(100, { message: 'El nombre debe tener menos de 100 caracteres' }),
  apellidos: z.string().min(2, { message: 'El apellido es requerido' }).max(100, { message: 'El apellido debe tener menos de 100 caracteres' }),
  email: z.string().min(2, { message: 'El correo es requerido' }).max(100, { message: 'El correo debe tener menos de 100 caracteres' }).email({ message: 'El correo no es valido' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }).optional().or(z.literal('')),
  rol: z.string().min(1, { message: 'El rol es requerido' }),
})

type FormSchema = z.infer<typeof validationSchema>

const EditUsuario = ({ usuario }: { usuario: Usuario }) => {
  const [dialogIsOpen, setIsOpen] = useState(false)
  const [isSubmiting, setSubmiting] = useState(false)
  const { mutate } = useUsuarioList();
  const { rolesList } = useRolesList();
  const [showPassword, setShowPassword] = useState(false)


  const openDialog = () => {
    reset({
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      email: usuario.email,
      rol: usuario.rol,
      password: '',
    })
    setIsOpen(true)
  }

  const onDialogClose = (e: MouseEvent) => {
    setIsOpen(false)
  }

  const { handleSubmit, formState: { errors }, control, reset } = useForm<FormSchema>({
    resolver: zodResolver(validationSchema),
  })

  const onSubmit = async (formValue: FormSchema) => {
    setSubmiting(true)

    try {
      await apiEditUsuario(usuario.id, formValue)
      setIsOpen(false)
      mutate();
      toast.push(
        <Notification
          title="Usuario actualizado"
          type="success"
        >
          El usuario ha sido actualizado exitosamente.
        </Notification>
      )

    } catch (error) {
      console.log(error);

      toast.push(
        <Notification
          title="Error al editar el usuario"
          type="danger"
        >
          Hubo un problema al intentar editar el usuario. Por favor, intenta de nuevo.
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
      <Tooltip title="Editar">
        <div
          className={`text-xl cursor-pointer select-none font-semibold`}
          role="button"
          onClick={() => openDialog()}
        >
          <TbPencil />
        </div>
      </Tooltip>
      <Dialog
        isOpen={dialogIsOpen}
        bodyOpenClassName="overflow-hidden"
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
      >
        <h5 className="mb-4">Editar usuario</h5>
        {/* Form content can go here */}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormItem
            label="Nombres completos"
            invalid={Boolean(errors.nombres)}
            errorMessage={errors.nombres?.message}
          >
            <Controller
              name="nombres"
              control={control}
              render={({ field }) => (
                <Input type="text" placeholder='Juan Perez' autoComplete="off" {...field} />
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
                <Input type="text" placeholder='Juan Perez' autoComplete="off" {...field} />
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
                <Input type="email" placeholder='correo@gmail.com' autoComplete="off" {...field} />
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
                  value={roles.find((role) => role.value === field.value)}
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
              Editar
            </Button>
          </div>
        </Form>

      </Dialog>
    </div>
  )
}

export default EditUsuario

