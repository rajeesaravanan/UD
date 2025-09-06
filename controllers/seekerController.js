import { fetchStudentsFromAPI } from "../services/studentService.js"
import { createSeeker } from "../services/seekerService.js";

export const fetchAndSaveSeekers = async (req, res) => {
    try{
        const studentsData = await fetchStudentsFromAPI()
        const count = await createSeeker(studentsData)

        res.json({ message: "Seekers saved successfully", count})
    }catch(error){
        console.error("Error saving seekers: ", error)
        res.status(500).json({ error: "Failed to save seekers data"})
    }
}
