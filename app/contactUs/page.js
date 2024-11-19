import React, { useState } from 'react'
import clientPromise from "@/lib/mongodb"
import { redirect } from "next/navigation"

export default function Contact() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [responseMessage, setResponseMessage] = useState("")
    const [formSubmitted, setFormSubmitted] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Send the form data to the API for database insertion
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message })
        })

        const result = await response.json()

        if (result.success) {
            setResponseMessage("Thank you for contacting us. We'll get back to you soon!")
            setFormSubmitted(true)
            setName("")
            setEmail("")
            setMessage("")
        } else {
            setResponseMessage("There was an issue submitting the form. Please try again.")
        }
    }

    return (
        <div className="mx-auto max-w-lg bg-blue-100 my-16 p-8 rounded-lg flex flex-col gap-4">
            <h1 className="font-bold text-2xl">Contact Us</h1>
            {!formSubmitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        value={name}
                        className="px-4 py-2 focus:outline-blue-600 rounded-md"
                        placeholder="Your Name"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        value={email}
                        className="px-4 py-2 focus:outline-blue-600 rounded-md"
                        placeholder="Your Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <textarea
                        value={message}
                        className="px-4 py-2 focus:outline-blue-600 rounded-md"
                        placeholder="Your Message"
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 rounded-lg shadow-lg p-3 py-1 my-3 font-bold text-white"
                    >
                        Send Message
                    </button>
                </form>
            ) : (
                <p className="text-green-600">{responseMessage}</p>
            )}
        </div>
    )
}
