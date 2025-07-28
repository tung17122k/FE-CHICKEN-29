import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Ép kiểu mở rộng có thuộc tính `nextauth`
interface WithAuthNextRequest extends NextRequest {
    nextauth: {
        token: any;
    };
}

export default withAuth(
    function middleware(req: WithAuthNextRequest) {
        const token = req.nextauth.token;

        if (req.nextUrl.pathname.startsWith("/product/upload")) {
            const userRole = token?.user?.role;

            if (userRole !== "ADMIN") {
                // Nếu không phải ADMIN thì chuyển hướng
                return NextResponse.redirect(new URL("/unauthorized", req.url));
            }
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
        pages: {
            signIn: "/auth/signin",
        },
    }
);

export const config = {
    matcher: ["/cart", "/order", "/product/upload"],
};
