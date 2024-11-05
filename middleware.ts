import { auth } from "./auth"

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const { nextUrl } = req
  
  // Protect dashboard route
  if (nextUrl.pathname.startsWith("/dashboard")) {
    if (!isLoggedIn) {
      return Response.redirect(new URL("/", nextUrl))
    }
  }
  
  return undefined
})