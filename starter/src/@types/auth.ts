export type SignInCredential = {
    email: string
    password: string
}

export type SignInResponse = {
    token: string
    user: User
    status: string
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    userName: string
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
    id?: string | null
    avatar?: string | null
    nombres?: string | null
    apellidos?: string | null
    rol?: string | null
    usuario?: string | null
    fuente?: string | null
    email?: string | null
    authority?: string[]
}

export type Token = {
    accessToken: string
    refereshToken?: string
}

export type OauthSignInCallbackPayload = {
    onSignIn: (tokens: Token, user?: User) => void
    redirect: () => void
}
