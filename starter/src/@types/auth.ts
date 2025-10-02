export type SignInCredential = {
    email: string
    password: string
}

export type SignInResponse = {
    status: string
    token: string
    token_type: string
    expires_in: number
    user: User
}
export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    nombres: string
    apellidos: string
    usuario: string
    rol: string
    fuente: string
    email: string
    password: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}

export type AuthRequestStatus = 'success' | 'failed' | ''

export type AuthResult = Promise<{
    status: AuthRequestStatus
    message: string
}>

export type User = {
    id: string
    avatar: string
    nombres: string
    apellidos: string
    usuario: string
    fuente: string
    email: string
    rol: string
    activo: boolean
}

export type Token = {
    accessToken: string
    refereshToken?: string
}

export type CsrfToken = {
    token: string
}

export type OauthSignInCallbackPayload = {
    onSignIn: (tokens: Token, user?: User) => void
    redirect: () => void
}
