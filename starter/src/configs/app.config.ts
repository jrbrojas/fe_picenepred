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
    apiPrefix: 'http://127.0.0.1:8003/api/v1',
    apiPrefixDGP: 'http://127.0.0.1:8000/api/v1',
    apiPrefixDIMSE: 'http://127.0.0.1:8001/api/v1',
    urlImagePrefix: 'http://127.0.0.1:8003/storage',
    urlImagePrefixDGP: 'http://127.0.0.1:8000/storage',
    urlImagePrefixDIMSE: 'http://127.0.0.1:8001/storage',
    authenticatedEntryPath: '/dashboard',
    unAuthenticatedEntryPath: '/home',
    locale: 'es',
    accessTokenPersistStrategy: 'localStorage',
    enableMock: true,
    activeNavTranslation: true,
}

export default appConfig
