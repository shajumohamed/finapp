import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { connectDB } from "@/lib/mongdb"
import User from "@/models/User"

export const runtime = "nodejs"

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    
    const user = await User.findOne({ email: session.user.email })
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST() {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    
    // Create or update user
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        emailVerified: new Date(),
      },
      { upsert: true, new: true }
    )

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Error creating/updating user:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}