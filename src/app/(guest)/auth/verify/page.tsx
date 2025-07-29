
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation'
import AuthVerify from "@/components/auth/auth.verify";





const VerifyPage = async () => {
    const session = await getServerSession(authOptions)
    if (session) {
        // redirect to home 
        redirect("/")
    }
    return (
        <AuthVerify />
    )
}

export default VerifyPage