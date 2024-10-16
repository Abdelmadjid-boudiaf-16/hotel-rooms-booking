import { auth } from "@/auth"
 
export default auth((req) => {
  if (req.nextUrl.pathname === "/") {
    return; // Continue without redirecting
  }
  if (!req.auth  && req.nextUrl.pathname !== '/login' && req.nextUrl.pathname !== '/register') {
    const newUrl = new URL("/login", req.nextUrl.origin)
    return Response.redirect(newUrl)
    }
    if (req.auth && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register')) {
        const newUrl = new URL("/dashboard", req.nextUrl.origin)
    return Response.redirect(newUrl)
    }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}