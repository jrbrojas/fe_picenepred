
import { useState } from 'react'
import { Notification, toast, Tooltip } from '@/components/ui'
import { TbTrash } from 'react-icons/tb'
import useUsuarioList from '../hooks/useUsuarioList'
import { ConfirmDialog } from '@/components/shared'
import { apiDeleteUsuario } from '@/services/UsuariosService'


const DeleteUsuario = ({ userId }: { userId: number | string }) => {
  const [dialogIsOpen, setIsOpen] = useState(false)
  const [isSubmiting, setSubmiting] = useState(false)
  const { mutate } = useUsuarioList();

  const openDialog = () => {
    setIsOpen(true)
  }

  const onDialogClose = () => {
    setIsOpen(false)
  }

  const onSubmit = async () => {
    setSubmiting(true)

    try {
      await apiDeleteUsuario(userId)
      setIsOpen(false)
      mutate();
      toast.push(
        <Notification
          title="Usuario eliminado"
          type="success"
        >
          El usuario ha sido eliminado exitosamente.
        </Notification>
      )
    } catch (error) {
      console.log(error);
      toast.push(
        <Notification
          title="Error al eliminar el usuario"
          type="danger"
        >
          Hubo un problema al intentar eliminar el usuario. Por favor, intenta de nuevo.
        </Notification>
      )
    } finally {
      setSubmiting(false)
    }
  }

  return (
    <div>
      <Tooltip title="Eliminar">
        <div
          className={`text-xl text-red-500 cursor-pointer select-none font-semibold`}
          role="button"
          onClick={() => openDialog()}
        >
          <TbTrash />
        </div>
      </Tooltip>
      <ConfirmDialog
        isOpen={dialogIsOpen}
        type="danger"
        title="Eliminar usuario"
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
        onCancel={onDialogClose}
        onConfirm={onSubmit}
        cancelText="Cancelar"
        confirmText="Eliminar"
      >
        <p>
          ¿Está seguro de que desea eliminar a este usuario?
          Todos los registros relacionados con él también se eliminarán.
          Esta acción no se puede deshacer.
        </p>
      </ConfirmDialog>
    </div>
  )
}

export default DeleteUsuario

