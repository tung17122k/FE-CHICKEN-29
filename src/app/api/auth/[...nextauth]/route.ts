// https://next-auth.js.org/configuration/initialization#route-handlers-app

//https://next-auth.js.org/providers/credentials

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import FaceItProvider from "next-auth/providers/faceit"
import GoogleProvider from "next-auth/providers/google"
import { AuthOptions } from "next-auth"
import { sendRequest } from "@/utils/api"
import { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials";
import dayjs from "dayjs"


async function refreshAccessToken(token: JWT) {
    // console.log("refreshAccessToken", token.refresh_token);

    const res = await sendRequest<IBackendRes<JWT>>({
        url: `http://localhost:8080/refresh-token`,
        method: 'POST',
        body: {
            refresh_token: token.refresh_token
        },
    })
    console.log("res", res);

    if (res.data) {
        return {
            ...token,
            access_token: res.data.access_token,
            refresh_token: res.data.refresh_token,
            access_expire: dayjs(new Date()).add(Number(process.env.JWT_ACCESS_EXPIRE || 30), 'day').unix(),
            user: res.data.user
        }
    } else {
        // If the access token is invalid, we can return the original token
        // which will trigger a sign out
        return {
            ...token,
            error: "RefreshAccessTokenError"
        }
    }
}


export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    //https://next-auth.js.org/configuration/options#callbacks
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",

            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "text", placeholder: "admin@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

                const res = await sendRequest<IBackendRes<JWT>>({
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}login`,
                    method: 'POST',
                    body: {
                        email: credentials?.email,
                        password: credentials?.password
                    },
                })

                if (res && res.data) {
                    // Any object returned will be saved in `user` property of the JWT
                    // return res.data as any
                    return {
                        access_token: res.data.access_token,
                        refresh_token: res.data.refresh_token,
                        user: res.data.user,
                        id: res.data.user.id,
                        email: res.data.user.email,
                        image: "",
                        name: res.data.user.name
                    }

                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    // return null
                    const message = Array.isArray(res?.message)
                        ? res.message.map((err) => err.message).join('\n')
                        : res?.message || 'Đăng nhập thất bại';

                    throw new Error(message);




                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        }),

        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })

    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user, account, profile, trigger }) {
            // social media tra ve data => goi len db de luu vao db => db tra ve res => luu vao token => roi lay tu token luu vao session
            // console.log("user", user);

            if (trigger === "signIn" && account?.provider !== 'credentials') {
                const res = await sendRequest<IBackendRes<JWT>>({
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/social-media`,
                    method: 'POST',
                    body: {
                        type: account?.provider.toLocaleUpperCase(), email: user.email
                    },
                })
                if (res.data) {
                    token.access_token = res.data.access_token
                    token.refresh_token = res.data.refresh_token
                    token.user = res.data.user

                }
            }

            if (trigger === "signIn" && account?.provider === 'credentials') {
                // const u = user as unknown as JWT

                token.access_token = user.access_token

                token.refresh_token = user.refresh_token

                token.access_expire = dayjs(new Date()).add(Number(process.env.JWT_ACCESS_EXPIRE || 30), 'days').unix()

                token.user = user.user
            }

            const isTimeAfter = dayjs(dayjs(new Date())).isAfter(dayjs.unix((token?.access_expire as number ?? 0)));
            if (isTimeAfter) {
                return await refreshAccessToken(token)
            }

            return token
        },
        session({ session, token, user }) {

            if (token) {
                session.access_token = token.access_token
                session.refresh_token = token.refresh_token
                session.user = token.user
                session.expires = token.access_expire as string
            }
            // console.log("token", token);

            return session
        },
    },
    pages: {
        signIn: "/auth/signin",
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }


