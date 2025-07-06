// https://next-auth.js.org/configuration/initialization#route-handlers-app

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import FaceItProvider from "next-auth/providers/faceit"
import GoogleProvider from "next-auth/providers/google"
import { AuthOptions } from "next-auth"



export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        FaceItProvider({
            clientId: process.env.FACEIT_CLIENT_ID,
            clientSecret: process.env.FACEIT_CLIENT_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    secret: process.env.NO_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }


