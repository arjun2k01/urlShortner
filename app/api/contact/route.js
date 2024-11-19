import clientPromise from "@/lib/mongodb"

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body

        // Ensure all fields are filled
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: 'All fields are required.' })
        }

        try {
            // Connect to MongoDB
            const client = await clientPromise
            const db = client.db("bitlinks") // Replace with your database name
            const collection = db.collection("contact_messages") // The collection to store messages

            // Insert the contact message into MongoDB
            await collection.insertOne({
                name,
                email,
                message,
                timestamp: new Date()
            })

            // Respond with success message
            return res.status(200).json({ success: true, message: 'Message received!' })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ success: false, message: 'There was an error saving your message. Please try again.' })
        }
    } else {
        // Handle non-POST requests
        res.status(405).json({ success: false, message: 'Method Not Allowed' })
    }
}
