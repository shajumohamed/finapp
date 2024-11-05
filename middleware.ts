import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export const config = {
  matcher: ["/dashboard/:path*"]
}

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  })

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}