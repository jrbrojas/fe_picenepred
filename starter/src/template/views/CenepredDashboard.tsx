import { Card, Button } from '@/components/ui'
import { SignInBase } from './auth/SignIn'

const CenepredDashboard = () => {
    return (
        <div className="flex items-center justify-center bg-gray-100">
            <Card className="p-6 w-full max-w-md">
                <SignInBase />
            </Card>
        </div>
    )
}

export default CenepredDashboard
