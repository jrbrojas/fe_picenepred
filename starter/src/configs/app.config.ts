export type AppConfig = {
    apiPrefix: string
    apiPrefixDGP: string
    urlImagePrefix: string
    urlImagePrefixDGP: string
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
    urlImagePrefix: 'http://127.0.0.1:8003/storage',
    urlImagePrefixDGP: 'http://127.0.0.1:8000/storage',
    authenticatedEntryPath: '/home',
    unAuthenticatedEntryPath: '/default',
    locale: 'en',
    accessTokenPersistStrategy: 'cookies',
    enableMock: true,
    activeNavTranslation: false,
}

export default appConfig
