export type GetUsuariosListResponse = {
    list: Usuario[]
    total: number
}

export type GetRolesListResponse = {
    list: Role[]
}

export type Filter = {
    purchasedProducts?: string
    purchaseChannel?: Array<string>
}

export type Usuario = {
    id: string
    nombres: string
    apellidos: string
    email: string
    rol: string
    estado: string
}

export type Role = {
    id: string | number
    name: string
}