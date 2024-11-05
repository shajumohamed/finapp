"use client"

import {  useState } from "react"
import { submitContactForm } from "./actions"
import { toast } from "sonner"

export default function ContactForm() {
  const [pending, setPending] = useState(false)
  //const [state, formAction] = useActionState(submitContactForm, null)

  const handleSubmit = async (formData: FormData) => {
    setPending(true)
    try {
      const result = await submitContactForm(formData)
      if (result?.success) {
        toast.success("Message sent successfully!")
        // Reset form
        const form = document.getElementById("contactForm") as HTMLFormElement
        form?.reset()
      } else {
        toast.error(result?.error || "Failed to send message")
      }
    } catch (error) {
      console.error("An error occurred:", error) 
      toast.error("An error occurred")
    } finally {
      setPending(false)
    }
  }

  return (
    <form id="contactForm" action={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          minLength={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          required
          minLength={10}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? "Sending..." : "Send Message"}
      </button>
    </form>
  )
}