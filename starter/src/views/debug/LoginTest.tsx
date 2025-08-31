import { useState } from 'react'
import { useAuth } from '@/auth'
import { Button } from '@/components/ui'

const LoginTest = () => {
    const [result, setResult] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const { signIn } = useAuth()

    const testLogin = async () => {
        setLoading(true)
        setResult('Intentando iniciar sesión...')

        try {
            const response = await signIn({
                email: 'admin-01@ecme.com',
                password: '123Qwe',
            })

            console.log('Respuesta del login:', response)
            setResult(
                `Resultado: ${response?.status} - ${response?.message || 'Sin mensaje'}`,
            )
        } catch (error) {
            console.error('Error en el login:', error)
            setResult(`Error: ${error}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Test de Login</h1>
            <div className="mb-4">
                <strong>Credenciales de prueba:</strong>
                <br />
                Email: admin-01@ecme.com
                <br />
                Password: 123Qwe
            </div>
            <Button onClick={testLogin} loading={loading} className="mb-4">
                Probar Login
            </Button>
            <div className="p-4 bg-gray-100 rounded">
                <strong>Resultado:</strong>
                <br />
                {result}
            </div>
        </div>
    )
}

export default LoginTest
