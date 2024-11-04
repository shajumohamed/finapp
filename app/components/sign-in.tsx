import { signIn } from "@/auth"

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#4285F4", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
        Sign in with Google
      </button>
    </form>
  )
} 