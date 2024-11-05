import { auth, signIn, signOut } from "@/auth"
import Link from "next/link"

export default async function NavBar() {
  const session = await auth()

  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link 
              href="/" 
              className="flex items-center px-2 py-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
            >
              Home
            </Link>
            {session?.user && (
              <Link 
                href="/dashboard" 
                className="flex items-center px-2 py-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
              >
                Dashboard
              </Link>
            )}
            <Link 
              href="/contact" 
              className="flex items-center px-2 py-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
            >
              Contact
            </Link>
            <Link 
              href="/terms" 
              className="flex items-center px-2 py-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
            >
              Terms
            </Link>
          </div>
          <div className="flex items-center">
      {session?.user ? (
        <form
          action={async () => {
            "use server"
            await signOut()
          }}
        >
          <button 
            type="submit"
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Sign Out
          </button>
        </form>
      ) : (
        <form
          action={async () => {
            "use server"
            await signIn("google")
          }}
        >
          <button 
            type="submit"
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </form>
      )}
    </div>
        </div>
      </div>
    </nav>
  )
}