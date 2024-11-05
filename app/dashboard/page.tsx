import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/")
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center gap-4 mb-6">
            {session.user.image && (
              <img 
                src={session.user.image} 
                alt={session.user.name || "User"} 
                className="w-12 h-12 rounded-full"
              />
            )}
            <div>
              <h2 className="text-xl font-semibold">{session.user.name}</h2>
              <p className="text-gray-600 dark:text-gray-300">{session.user.email}</p>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-200">
            Welcome to your protected dashboard!
          </p>
        </div>
      </div>
    </div>
  )
}