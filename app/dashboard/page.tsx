import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Image from 'next/image' // Import the Image component

export const runtime = "nodejs"

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/")
  }

  // Fetch user data from our API
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user`)
  const data = await response.json()

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center gap-4 mb-6">
            {session.user.image && (
              <Image 
                src={session.user.image} 
                alt={session.user.name || "User"} 
                className="w-12 h-12 rounded-full"
                width={48} // Specify width
                height={48} // Specify height
              />
            )}
            <div>
              <h2 className="text-xl font-semibold">{session.user.name}</h2>
              <p className="text-gray-600 dark:text-gray-300">{session.user.email}</p>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Account Details</h3>
            <p className="text-gray-700 dark:text-gray-200">
              Member since: {new Date(data?.user?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}