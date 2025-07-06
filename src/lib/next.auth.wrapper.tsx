'use client'
import { SessionProvider } from "next-auth/react"

//https://next-auth.js.org/getting-started/example#configure-shared-session-state
export default function NextAuthWrapper({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <SessionProvider>
                    {children}
                </SessionProvider>
            </body>
        </html>
    );
}
