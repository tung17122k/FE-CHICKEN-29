// https://next-auth.js.org/getting-started/typescript#main-module
// https://stackoverflow.com/questions/78802131/next-js-next-auth-credentials-with-custom-user

import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { JWT } from "next-auth/jwt"

interface IUser {
    id: string,
    email: string,
    role: string,
    accountType: string,
    name: string,
    roleId: number,
    phone: string,
    address: string
}


declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: IUser,
        access_token: string,
        refresh_token: string,
    }
    interface User extends DefaultUser {
        user: IUser,
        access_token: string,
        refresh_token: string,
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        access_token: string,
        refresh_token: string,
        user: IUser
    }
}


