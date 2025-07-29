
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation'
import AuthSignUp from "@/components/auth/auth.signup";




const SignUpPage = async () => {
    const session = await getServerSession(authOptions)
    if (session) {
        // redirect to home 
        redirect("/")
    }
    return (
        <AuthSignUp />
    )
}

export default SignUpPage