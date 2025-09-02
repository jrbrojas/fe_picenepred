import Views from './views/Views'
import { AuthProvider } from '@/auth'
import Layout from '@/components/layouts'
import Theme from '@/components/template/Theme'
import { BrowserRouter } from 'react-router-dom'

function App() {
    return (
        <Theme>
            <BrowserRouter>
                <AuthProvider>
                    <Layout>
                        <Views />
                    </Layout>
                </AuthProvider>
            </BrowserRouter>
        </Theme>
    )
}

export default App
