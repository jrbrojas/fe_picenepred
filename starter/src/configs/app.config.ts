export type AppConfig = {
    apiPrefix: string
    apiPrefixDGP: string
    apiPrefixDIMSE: string
    urlImagePrefix: string
    urlImagePrefixDGP: string
    urlImagePrefixDIMSE: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    locale: string
    accessTokenPersistStrategy: 'localStorage' | 'sessionStorage' | 'cookies'
    enableMock: boolean
    activeNavTranslation: boolean
}

const appConfig: AppConfig = {
    apiPrefix: import.meta.env.VITE_API_URL,
    apiPrefixDGP: import.meta.env.VITE_API_URL_DGP,
    apiPrefixDIMSE: import.meta.env.VITE_API_URL_DIMSE,
    urlImagePrefix: import.meta.env.VITE_API_STORAGE_URL,
    urlImagePrefixDGP: import.meta.env.VITE_API_STORAGE_URL_DGP,
    urlImagePrefixDIMSE: import.meta.env.VITE_API_STORAGE_URL_DIMSE,
    authenticatedEntryPath: '/dashboard',
    unAuthenticatedEntryPath: '/home',
    locale: 'es',
    accessTokenPersistStrategy: 'localStorage',
    enableMock: true,
    activeNavTranslation: true,
}

export default appConfig
