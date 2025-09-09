import { createSeekerDetails } from "../services/seekerDetailsService.js"

export const createSeekerDetailsAPI = async (req, res) => {
  try {
    const count = await createSeekerDetails()
    res.json({ message: "SeekerDetails created successfully", count })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to create SeekerDetails" })
  }
}
